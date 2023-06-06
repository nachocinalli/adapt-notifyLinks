import Adapt from 'core/js/adapt';
import data from 'core/js/data';
import components from 'core/js/components';
import logging from 'core/js/logging';
import notify from 'core/js/notify';
class NotifyLinks extends Backbone.Controller {
  initialize() {
    this.listenTo(Adapt, {
      'app:dataReady': this._onDataReady
    });
  }

  _onDataReady() {
    if (!this.checkIsEnabled()) return;
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.listenTo(Adapt, 'pageView:ready', this.handlePageViewReady);
    this.listenTo(Adapt, 'pageView:preRemove', this.handlePageViewPreRemove);
  }

  handlePageViewReady(view) {
    const _config = Adapt.course.get('_notifyLinks');
    const _selector = _config._selector;
    $(_selector).on('click', this.handleClick.bind(this));
  }

  handleClick(event) {
    event.preventDefault();
    const href = $(event.currentTarget).attr('href');
    const startsWith = '#/id/';
    const modelIdStr = href.startsWith(startsWith)
      ? href.replace(startsWith, '')
      : href.replace(/^#/, '');
    this.navigateTo(modelIdStr);
  }

  handlePageViewPreRemove() {
    const _config = Adapt.course.get('_notifyLinks');
    const _selector = _config._selector;
    $(_selector).off('click', this.handleClick.bind(this));
  }

  navigateTo(modelId) {
    const model = data.findById(modelId);
    const View = components.getViewClass(model);
    const view = new View({ model });

    _.defer(async () => {
      try {
        await notify.popup({
          _view: view,
          _attributes: { 'data-adapt-id': modelId },
          _type: 'popup',
          _isCancellable: true,
          _showCloseButton: true,
          _closeOnBackdrop: true,
          _classes: 'notifylinks'
        });
      } catch (err) {
        logging.warn(`Notify links cannot show model id: ${modelId}\n`, err);
      }
    });
  }

  checkIsEnabled() {
    const _config = Adapt.course.get('_notifyLinks');
    if (!_config || !_config._isEnabled) return false;
    return true;
  }
}
export default new NotifyLinks();
