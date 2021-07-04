import Generator from 'yeoman-generator';
import * as R from 'ramda';

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

  private async getModifiedAnswers(questions: Generator.Questions<Answers>) {
    try {
      return R.merge(this.answers, await this.prompt<Answers>(questions));
    } catch(error) {
      this.log(error);
      return {};
    }
  }

  async prompting() {
    this.answers = await this.getModifiedAnswers(
      {
        type: "confirm",
        name: "isMonorepo",
        message: "Would you like to setup a monorepo?"
      }
    );

    if (this.getAnswer('isMonorepo')) {
      this.answers = await this.getModifiedAnswers({
        type: "confirm",
        name: "useWorkspace",
        message: "Would you like to use yarn workspace?"
      })
    }

    this.log('Thanks, going further!');

      this.answers = await this.getModifiedAnswers(
        {
          type: this.getAnswer('isMonorepo') ? "checkbox" : 'list',
          name: "projects",
          message: "Choose what you would like to set up",
          choices: ['Web', 'Mobile', 'Server']
        }
      )
  }

  writing() {
    this.log("cool feature", JSON.stringify(this.answers)); // user answer `cool` used
  }
};