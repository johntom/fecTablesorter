import {DialogController} from 'aurelia-dialog';
export class Prompt {
  static inject = [DialogController];

  constructor(controller) {
    this.controller = controller;
    this.answer = null;

    controller.settings.lock = false;
  }

  activate(question) {
    this.question = question;
  }
}