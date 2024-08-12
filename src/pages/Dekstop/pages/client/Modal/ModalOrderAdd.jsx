import React, { useEffect, useState } from "react";
import { getBundleByType } from "../../../../../api/apiProduct";
import { MdClose } from "react-icons/md";
import { format } from "date-fns";

export default function ModalOrderAdd({ isOpen, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [productMember, setProductMember] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState(0);
  const [listProductName, setListProductName] = useState([]);
  const [typeKendaraan, setTypeKendaraan] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (typeKendaraan) {
        const response = await getBundleByType.getByType(typeKendaraan);
        setListProductName(response.data);
      } else {
        setListProductName([]);
      }
    };
    fetchData();
  }, [typeKendaraan]);

  useEffect(() => {
    if (!typeKendaraan || !productMember) {
      setStartDate("");
      setEndDate("");
      setPrice(0);
      setQuantity(1);
      setTotalAmount(0);
    }
  }, [typeKendaraan, productMember]);

  const handleProductMember = (e) => {
    const productId = e.target.value;
    setProductMember(productId);

    if (productId !== "") {
      const selected = listProductName.find(
        (item) => item.id === parseInt(productId)
      );
      if (selected) {
        setSelectedProduct(selected);
        setStartDate(format(new Date(selected.StartDate), "yyyy-MM-dd"));
        setEndDate(format(new Date(selected.EndDate), "yyyy-MM-dd"));
        const price = parseFloat(selected.Price);
        setPrice(price);
        setTotalAmount(price * quantity);
      }
    } else {
      setSelectedProduct(null);
      setStartDate("");
      setEndDate("");
      setPrice(0);
      setTotalAmount(0);
    }
  };

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value, 10) || 1;
    setQuantity(qty);
    if (price) {
      setTotalAmount(price * qty);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 text-sm">
      <div className="bg-white rounded-lg w-1/2">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center border-b border-slate-00 py-3">
            <h3 className="text-xl font-semibold">Create Order</h3>
            <button
              className="text-gray-500 hover:text-gray-700 w-5 h-5"
              onClick={onClose}
            >
              <MdClose />
            </button>
          </div>
          <form onSubmit={""} className="text-start">
            <div className="flex flex-row justify-between items-center gap-x-2">
              <div className="mt-2 w-1/2">
                <label className="block text-gray-700">Type Vehicle</label>
                <select
                  className="w-full mt-2 px-4 py-2 border rounded-lg"
                  value={typeKendaraan}
                  onChange={(e) => setTypeKendaraan(e.target.value)}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Motor">Motor</option>
                  <option value="Mobil">Mobil</option>
                </select>
              </div>
              <div className="mt-2 w-1/2">
                <label className="block text-gray-700">Product</label>
                <select
                  className="w-full mt-2 px-4 py-2 border rounded-lg"
                  value={productMember}
                  onChange={handleProductMember}
                  required
                >
                  <option value="">Select Product</option>
                  {typeKendaraan !== "" ? (
                    listProductName.map((items, index) => (
                      <option key={index} value={items.id}>
                        {items.Name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No Products Available
                    </option>
                  )}
                </select>
              </div>
            </div>

            <div className="mt-2 flex justify-between items-center w-full gap-x-2">
              <div className="w-1/2">
                <label className="block text-gray-700">Start Date</label>
                <input
                  type="text"
                  className="w-full mt-2 px-4 py-2 border rounded-lg"
                  value={startDate}
                  readOnly
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700">End Date</label>
                <input
                  type="text"
                  className="w-full mt-2 px-4 py-2 border rounded-lg"
                  value={endDate}
                  readOnly
                />
              </div>
            </div>

            <div className="flex justify-between items-center w-full gap-x-2">
              <div className="mt-2 w-1/3">
                <label className="block text-gray-700">Price</label>
                <input
                  type="text"
                  className="w-full mt-2 px-4 py-2 border rounded-lg"
                  value={`${price.toLocaleString("id-ID")}`}
                  readOnly
                />
              </div>
              <div className="mt-2 w-1/3">
                <label className="block text-gray-700">Quantity</label>
                <input
                  type="number"
                  min="1"
                  className="w-full mt-2 px-4 py-2 border rounded-lg"
                  value={quantity}
                  onChange={handleQuantityChange}
                  required
                />
              </div>
              <div className="mt-2 w-1/3">
                <label className="block text-gray-700">Total Amount</label>
                <input
                  type="text"
                  className="w-full mt-2 px-4 py-2 border rounded-lg"
                  value={`${totalAmount.toLocaleString("id-ID")}`}
                  readOnly
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="bg-red-300 hover:bg-red-400 text-red-700 px-4 py-2 rounded mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
