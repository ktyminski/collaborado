// jshint esversion: 6

import module from './sidebar.module';
import template from './sidebar.html';
import data from './data.json';
import _ from 'lodash';

function extractElements(groups) {
  let elements = [];
  _.forEach(groups, (group, name) => {
    elements.push({
      id: name,
      name: group.displayName
    });
  });
  return elements;
}

class Sidebar {
  constructor($scope, $timeout) {
    'ngInject';

    this.$onInit = () => {
      this.groups = extractElements(data);
      this.selectedGroup = this.groups[0];
      this.channels = extractElements(data[this.selectedGroup.id].channels);
      this.selectedChannel = undefined;

      this.user = {
        login: "spalonytoster",
        name: "Maciej",
        surname: "Posłuszny",
        get displayName() {
          return `${this.name} ${this.surname}`;
        }
      };
    };
  }

  selectGroup(event) {
    this.selectedGroup = event.selected;
    delete this.selectedChannel;
  }

  selectChannel(event) {
    this.selectedChannel = event.selected;
  }
}

const name = 'sidebar';

module.component(name, {
  template,
  controller: Sidebar
});
