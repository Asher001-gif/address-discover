export interface Shop {
  id: string;
  name: string;
  service: string;
  address: string;
  phone?: string;
  rating?: number;
  hours?: string;
}

// Add your shops & services data here later
export const shops: Shop[] = [
  // Example format:
  // {
  //   id: "1",
  //   name: "Quick Fix Electronics",
  //   service: "Electronics Repair",
  //   address: "123 Main Street, Downtown",
  //   phone: "+1 555-0101",
  //   rating: 4.5,
  //   hours: "9 AM - 7 PM",
  // },
];
