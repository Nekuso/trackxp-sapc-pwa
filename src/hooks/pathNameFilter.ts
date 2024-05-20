export const pathNameFilter = (pathname: string) => {
  switch (true) {
    case pathname.includes("orders"):
      return "Orders";
    case pathname.includes("redeem"):
      return "Redeem";
    case pathname.includes("announcements"):
      return "Announcements";
    case pathname.includes("profile"):
      return "Profile";
    default:
      return "Dashboard";
  }
};
