import React from "react";

const data = [
  {
    id: 1,
    createdAt: "2024-07-12 10:40",
    TypeTransaction: "Topup",
    PaymentMethod: "Gopay",
    status: "Paid",
  },
  {
    id: 2,
    createdAt: "2024-07-12 11:40",
    TypeTransaction: "Parking",
    PaymentMethod: "-",
    status: "IN",
  },
  {
    id: 3,
    createdAt: "2024-07-12 20:40",
    TypeTransaction: "Parking",
    PaymentMethod: "-",
    status: "OUT",
  },
  {
    id: 4,
    createdAt: "2024-07-13 10:40",
    TypeTransaction: "Parking",
    PaymentMethod: "-",
    status: "IN",
  },
  {
    id: 5,
    createdAt: "2024-07-13 10:40",
    TypeTransaction: "Parking",
    PaymentMethod: "-",
    status: "IN",
  },
];

function TableDashboard() {
  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto flex flex-col items-start">
        <h1 className="text-start font-medium">History</h1>
        <p className="text-xs text-gray-400 text-start font-medium mb-3">
          Last 10 transaction member
        </p>
        <table className="min-w-full divide-y divide-amber-700 rounded-md">
          <thead className="">
            <tr>
              <th
                scope="col"
                className="p-2 text-start text-xs font-medium text-gray-500 uppercase tracking-wider w-[5%]"
              >
                ID
              </th>
              <th
                scope="col"
                className="p-2 text-start text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="p-2 text-start text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type Transaction
              </th>
              <th
                scope="col"
                className="p-2 text-start text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Payment method
              </th>
              <th
                scope="col"
                className="p-2 text-start text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((person, idx) => (
              <tr key={person.id} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="p-2 text-start whitespace-nowrap text-sm font-medium text-gray-900">
                  {person.id}
                </td>
                <td className="p-2 text-start whitespace-nowrap text-sm text-gray-500">
                  {person.createdAt}
                </td>
                <td className="p-2 text-start whitespace-nowrap text-sm text-gray-500">
                  {person.TypeTransaction}
                </td>
                <td className="p-2 text-start whitespace-nowrap text-sm text-gray-500">
                  {person.PaymentMethod}
                </td>
                <td className="p-2 text-start whitespace-nowrap text-sm text-gray-500">
                  {person.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="px-5 py-3 rounded-md shadow-inner border border-gray-100 my-3 text-xs hover:shadow-md hover:shadow-amber-300">
          Show more
        </button>
      </div>
    </div>
  );
}

export default TableDashboard;
