export const getFactionName = (faction: null | 0 | 1 | 2) => {
  switch (faction) {
    case 0:
      return "MUD";
    case 1:
      return "ONI";
    case 2:
      return "USTUR";
    default:
      return "NONE";
  }
};
