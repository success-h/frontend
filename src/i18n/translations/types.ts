export type TranslationId =
  | "Admin.SignatureLoader.title"
  | "Admin.Stats.Refresh.action.title"
  | "Admin.Stats.title"
  | "Badges.Heading.title"
  | "citizenship.banner.action.title"
  | "citizenship.banner.subtitle"
  | "citizenship.banner.pre.subtitle"
  | "citizenship.banner.title"
  | "citizenship.banner.pre.title"
  | "citizenship.checkout.cart.total.label"
  | "citizenship.checkout.confirmed.description.0"
  | "citizenship.checkout.confirmed.description.1"
  | "citizenship.checkout.confirmed.details.amount.label"
  | "citizenship.checkout.confirmed.details.date.label"
  | "citizenship.checkout.confirmed.details.fee.label"
  | "citizenship.checkout.confirmed.details.label"
  | "citizenship.checkout.confirmed.details.state.label"
  | "citizenship.checkout.confirmed.details.state.completed"
  | "citizenship.checkout.confirmed.back.action.title"
  | "citizenship.checkout.confirmed.reference.label"
  | "citizenship.checkout.confirmed.subtitle"
  | "citizenship.checkout.confirmed.title"
  | "citizenship.checkout.error.title"
  | "citizenship.checkout.error.description"
  | "citizenship.checkout.payDirectly.action.title"
  | "citizenship.checkout.qrcode.hint.0"
  | "citizenship.checkout.qrcode.hint.1"
  | "citizenship.checkout.subtitle"
  | "citizenship.checkout.title"
  | "citizenship.factionSelector.title"
  | "citizenship.intro.description"
  | "citizenship.intro.hint"
  | "citizenship.intro.title"
  | "Dashboard.Profile.Placeholder.title"
  | "Fleet.Heading.title"
  | "generic.next"
  | "generic.or"
  | "Home.EnlistBanner.action.title"
  | "Home.EnlistBanner.description.0"
  | "Home.EnlistBanner.description.1"
  | "Home.EnlistBanner.title"
  | "Home.WelcomeBanner.action.title"
  | "Home.WelcomeBanner.description.0"
  | "Home.WelcomeBanner.description.1"
  | "Home.WelcomeBanner.title"
  | "Layout.Footer.Disclaimer.text"
  | "Layout.Footer.PrivacyPolicy.action.title"
  | "Layout.Footer.TermsAndCondition.action.title"
  | "Layout.Header.Dashboard.action.title"
  | "Layout.Loader.title"
  | "Layout.Sidebar.Dashboard.title"
  | "Layout.Sidebar.Feedback.title"
  | "Layout.Sidebar.FleetSim.title"
  | "Layout.Sidebar.Resources.title"
  | "Layout.Sidebar.ScoreTool.title"
  | "Layout.Sidebar.Ships.title"
  | "Layout.Sidebar.ShipsDeals.title"
  | "Layout.Sidebar.Stats.title"
  | "Layout.Treasury.title"
  | "Layout.Wallet.Connect.title"
  | "Layout.Wallet.Disconnect.title"
  | "Layout.Wallet.Modal.Connected.title"
  | "Layout.Wallet.Modal.ConnectedTo.title"
  | "Mint.AccessDenied.text"
  | "Mint.CheckBadge.text"
  | "Mint.Hyperspace.text"
  | "Referral.Banner.description"
  | "Referral.Banner.title"
  | "Ships.Details.calico_compakt_hero.description"
  | "Ships.Details.calico_evac.description"
  | "Ships.Details.Components.title"
  | "Ships.Details.Crew.title"
  | "Ships.Details.fimbul_byos_packlite.description"
  | "Ships.Details.Modules.title"
  | "Ships.Details.opal_jet.description"
  | "Ships.Details.opal_jetjet.description"
  | "Ships.Details.pearce_f4.description"
  | "Ships.Details.pearce_x4.description"
  | "Ships.Details.pearce_x5.description"
  | "Ships.Details.rainbow_chi.description"
  | "Ships.Details.rainbow_om.description"
  | "Ships.Details.saleDate"
  | "Ships.Details.tufa_feist.description"
  | "Ships.Details.vzus_ambwe.description"
  | "Ships.Details.vzus_opod.description"
  | "Ships.Heading.title"
  | "Ships.List.Card.BuyAction.title"
  | "Ships.List.Card.ReadMore.title"
  | "Ships.Table.Buy.action.title"
  | "Ships.Table.Column.atlasPrice"
  | "Ships.Table.Column.atlasPriceVsVwapPrice"
  | "Ships.Table.Column.name"
  | "Ships.Table.Column.price"
  | "Ships.Table.Column.priceVsVwapPrice"
  | "Ships.Table.Column.vwap"
  | "Ships.Table.Sell.action.title"
  | "Ships.Toolbar.grid"
  | "Ships.Toolbar.table"
  | "Wallet.Disconnect.action.title";

export type TranslationValues = {
  "Layout.Wallet.Modal.ConnectedTo.title": { wallet: string };
  "Mint.Hyperspace.text": { seconds: string };
  "Ships.Details.saleDate": { date: string };
  "citizenship.banner.pre.subtitle": { countdown: string };
};

export type TranslationValuesId = keyof TranslationValues;

export type GetTranslationValues<T> = T extends TranslationValuesId
  ? { values: TranslationValues[T] }
  : { values?: never };
