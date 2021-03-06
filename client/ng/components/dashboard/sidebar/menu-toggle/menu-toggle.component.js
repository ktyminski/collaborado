// jshint esversion: 6
import module from './menu-toggle.module';
import template from './menu-toggle.html';
import kebabCase from 'lodash/kebabCase';

class MenuToggle {
  constructor($element, $animateCss, $timeout, $mdPanel) {
    'ngInject';

    this.$onInit = () => {
      this.id = kebabCase(this.name);
      this.toggled = true;
      this._mdPanel = $mdPanel;
    };

    // standard way of implementing animation would create a delay on collapsing the list
    this.animateListToggle = () => {
      let getTargetHeight = (elem) => {
        var _targetHeight;

        elem.addClass('no-transition');
        elem.css('height', '');

        _targetHeight = elem.prop('clientHeight');

        elem.css('height', 0);
        elem.removeClass('no-transition');

        return _targetHeight;
      };
      let _el_ul = $element.find(`ul#docs-menu-${this.id}`);
      $animateCss(_el_ul, {
        from: {
          height: this.toggled ? 0 : (getTargetHeight(_el_ul) + 'px')
        },
        to: {
          height: this.toggled ? (getTargetHeight(_el_ul) + 'px') : 0
        },
        duration: 0.3
      }).start();
    };
  }

  toggle() {
    this.toggled = !this.toggled;
    this.animateListToggle();
  }

  isSelected(link) {
    if (!this.selected) return false;
    return link.id === this.selected.id;
  }

  select(event) {
    this.onSelected({
      $event: {
        selected: event.selected
      }
    });
  }

  checkCreationPermission() {
    return this.creationEnabled;
  }

  showPanel() {
    let targetComponent = this.createComponent;
    let groupId = this.groupId;
    let position = this._mdPanel.newPanelPosition()
      .absolute()
      .center();

    let config = {
      attachTo: angular.element(document.body),
      disableParentScroll: true,
      controller: function(mdPanelRef) {
        'ngInject';
        this.panelRef = mdPanelRef;
      },
      controllerAs: '$ctrl',
      template: `
        <${targetComponent} panel-ref="$ctrl.panelRef" group-id="${groupId}">
        </${targetComponent}>
      `,
      hasBackdrop: true,
      panelClass: `${targetComponent}-panel`,
      position: position,
      trapFocus: true,
      clickOutsideToClose: false,
      escapeToClose: true,
      focusOnOpen: true
    };

    this._mdPanel.open(config);
  }
}

const name = 'menuToggle';

module.component(name, {
  bindings: {
    name: '@',
    children: '<',
    selected: '<',
    onSelected: '&',
    creationEnabled: '<',
    createComponent: '@',
    groupId: '<'
  },
  template,
  controller: MenuToggle
});
