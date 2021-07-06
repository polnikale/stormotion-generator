import {pipe} from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import * as R from 'ramda';
import Generator from 'yeoman-generator';

interface Answers {
  isMonorepo?: boolean;
  useWorkspace?: boolean;
  projects?: string[];
}
module.exports = class extends Generator {
  private answers: Answers = {};

  private getAnswer(key: keyof Answers) {
    return this.answers[key];
  }

  private getModifiedAnswers(questions: Generator.Questions<Answers>) {
    return pipe(
      TE.tryCatch(
        () => this.prompt<Answers>(questions),
        (error) => {
          this.log(`Error happened ${error}`);
        },
      ),
      TE.map(R.merge(this.answers)),
      TE.orElse(R.always(TE.of(this.answers))),
    );
  }

  private saveEitherAnswer<T>(answersEither: TE.TaskEither<T, Answers>) {
    return pipe(
      answersEither,
      TE.map((answers) => {
        this.answers = answers;
        return answers;
      }),
    );
  }

  private getModifiedAnswersAndSave = R.pipe(
    this.getModifiedAnswers,
    this.saveEitherAnswer,
  );

  async prompting() {
    pipe(
      this.getModifiedAnswersAndSave({
        type: 'confirm',
        name: 'isMonorepo',
        message: 'Would you like to setup a monorepo?',
      }),
    );
    // this.answers = await

    // if (this.getAnswer('isMonorepo')) {
    //   this.answers = await this.getModifiedAnswers({
    //     type: "confirm",
    //     name: "useWorkspace",
    //     message: "Would you like to use yarn workspace?"
    //   })
    // }

    // this.log('Thanks, going further!');

    //   this.answers = await this.getModifiedAnswers(
    //     {
    //       type: this.getAnswer('isMonorepo') ? "checkbox" : 'list',
    //       name: "projects",
    //       message: "Choose what you would like to set up",
    //       choices: ['Web', 'Mobile', 'Server']
    //     }
    //   )
  }

  writing() {
    this.log('cool feature', JSON.stringify(this.answers)); // user answer `cool` used
  }
};
