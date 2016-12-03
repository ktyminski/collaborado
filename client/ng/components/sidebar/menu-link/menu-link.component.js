// jshint esversion: 6

import angular from 'angular';
import module from './menu-link.module';
import template from './menu-link.html';

class MenuLink {
  constructor() {
    'ngInject';
    console.log(this.selected);
  }

  select() {
    console.log('selected');
    this.onSelected({
      $event: {
        selected: angular.copy(this.link)
      }
    });
  }
}

const name = 'menuLink';

module.component(name, {
  bindings: {
    link: '<',
    selected: '<',
    onSelected: '&'
  },
  template,
  controller: MenuLink
});
