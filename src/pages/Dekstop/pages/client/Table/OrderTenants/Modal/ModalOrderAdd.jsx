import React, { useEffect, useState } from "react";
import {
  getProductAll,
  productBundleAll,
} from "../../../../../../../api/apiProduct";
import { MdClose } from "react-icons/md";
import { format } from "date-fns";
import Loading from "../../../../../components/Loading";
import { FaRegThumbsUp } from "react-icons/fa6";
import { Tenants } from "../../../../../../../api/apiTenant";

export default function ModalOrderAdd({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    ProductName: "",
    TenantName: "Testing",
    TenantId: 1,
    LocationId: "",
    LocationCode: "",
    LocationName: "",
    QuotaMember: "",
    Price: "",
    Periode: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [productMember, setProductMember] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState(0);
  const [listProductName, setListProductName] = useState([]);
  const [typeKendaraan, setTypeKendaraan] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      if (typeKendaraan) {
        try {
          const response = await getProductAll.getAllByType(typeKendaraan);
          setLocationList(response.data);
        } catch (error) {
          return null;
        }
      }
    };
    const fetchData = async () => {
      if (formData.LocationId) {
        const response = await productBundleAll.getByIdProduct(
          formData.LocationId
        );
        setListProductName(response.data);
      } else {
        setListProductName([]);
      }
    };

    if (price && quantity) {
      setTotalAmount(price * quantity);
    }

    setFormData((prevForm) => ({
      ...prevForm,
      Price: totalAmount,
      QuotaMember: quantity,
    }));

    fetchData();
    fetchLocation();
  }, [typeKendaraan, formData.LocationId, price, quantity, totalAmount]);

  const handleProductMember = (e) => {
    const productId = e.target.value;
    setProductMember(productId);

    if (productId !== "") {
      const selected = listProductName.find(
        (item) => item.id === parseInt(productId)
      );
      if (selected) {
        setStartDate(format(new Date(selected.StartDate), "yyyy-MM-dd"));
        setEndDate(format(new Date(selected.EndDate), "yyyy-MM-dd"));
        const priceValue = parseFloat(selected.Price);
        setPrice(priceValue);

        const startMonth = format(new Date(selected.StartDate), "MMM");
        const endMonth = format(new Date(selected.EndDate), "MMM");
        const period = `${startMonth} - ${endMonth}`;
        console.log(quantity);
        setFormData((prevForm) => ({
          ...prevForm,
          LocationName: selected.productList?.LocationName,
          LocationCode: selected.productList?.LocationCode,
          ProductName: selected.productList?.ProductName,
          Periode: period,
        }));

        setTotalAmount(priceValue * quantity);
      }
    } else {
      setStartDate("");
      setEndDate("");
      setPrice(0);
      setTotalAmount(0);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value, 10) || 1;
    setQuantity(qty);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (
        !formData.ProductName ||
        !formData.TenantName ||
        !formData.TenantId ||
        !formData.LocationId ||
        !formData.LocationCode ||
        !formData.LocationName ||
        !formData.QuotaMember ||
        !formData.Price
      ) {
        console.log(quantity);
        alert("Please fill in all required fields!");
        setIsLoading(false);
        return;
      }

      const response = await Tenants.createOrder(formData);
      if (!response || !response.data) {
        throw new Error("Failed to create product");
      }

      setIsLoading(false);
      setSuccessMessage("Product successfully added!");
      setShowSuccessModal(true);
      if (onSuccess) {
        onSuccess(true);
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 text-sm">
      {isLoading ? (
        <Loading />
      ) : showSuccessModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="flex flex-col justify-center items-center space-y-3 mb-10">
              <FaRegThumbsUp size={40} className="text-green-600" />
              <h3 className="text-lg">{successMessage}</h3>{" "}
              {/* Tampilkan successMessage */}
            </div>
            <button
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300"
              onClick={handleCloseSuccessModal}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
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
            <form className="text-start" onSubmit={handleSubmit}>
              <div className="grid grid-cols-3 gap-3">
                <div className="mt-2 w-full">
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
                <div className="mt-2 w-full">
                  <label htmlFor="LocationId" className="block text-gray-700">
                    Location
                  </label>
                  <select
                    id="LocationId"
                    name="LocationId"
                    className="w-full mt-2 px-4 py-2 border rounded-lg"
                    value={formData.LocationId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Location</option>
                    {locationList.map((items, index) => (
                      <option key={index} value={items.Id}>
                        {items.LocationName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-2 w-full">
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
                  <label htmlFor="QuotaMember" className="block text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    name="QuotaMember"
                    className="w-full mt-2 px-4 py-2 border rounded-lg"
                    value={quantity}
                    onChange={handleQuantityChange}
                    required
                  />
                </div>
                <div className="mt-2 w-1/3">
                  <label htmlFor="Price" className="block text-gray-700">
                    Total Amount
                  </label>
                  <input
                    type="text"
                    name="Price"
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
      )}
    </div>
  );
}
