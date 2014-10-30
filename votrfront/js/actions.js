(function () {


Votr.NotFoundPage = React.createClass({
  render: function () {
    return <Votr.PageLayout query={this.props.query}>
      <p>Action not found!</p>
    </Votr.PageLayout>;
  }
});


Votr.actions = {
  index: Votr.IndexPage,
  mojeHodnotenia: Votr.MojeHodnoteniaPage,
  mojePredmety: Votr.MojePredmetyPage,
  mojeSkusky: Votr.MojeSkuskyPage,
  prehladStudia: Votr.PrehladStudiaPage,
  registerOsob: Votr.RegisterOsobPage,
  registerPredmetov: Votr.RegisterPredmetovPage
};


Votr.modalActions = {
  about: Votr.AboutModal,
  detailPredmetu: Votr.DetailPredmetuModal,
  zoznamPrihlasenychNaTermin: Votr.ZoznamPrihlasenychNaTerminModal
};


Votr.App = React.createClass({
  propTypes: {
    query: React.PropTypes.object.isRequired
  },

  handleClose: function () {
    if (Votr.ajaxError) return;
    Votr.navigate(_.omit(
        this.props.query, (value, key) => key.substring(0, 5) == 'modal'));
  },

  render: function () {
    var query = this.props.query;
    var action = query.action || 'index';
    var mainComponent = Votr.actions[action] || Votr.NotFoundPage;
    var modalComponent = Votr.ajaxError ? Votr.ErrorModal : Votr.modalActions[query.modal];

    var C = mainComponent;
    return <div>
      <C query={query} />
      <Votr.ModalBase query={query} component={modalComponent} onClose={this.handleClose} />
      <Votr.LogViewer />
    </div>;
  }
});


})();
