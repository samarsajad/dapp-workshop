"use client";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import abi from "../config/abi.json";
import { ethers } from "ethers";

export default function Home() {
  const contractadd = "0xb459e9195Fd3298A047731E204FFF390B9666AdA";
  const [address, setAddress] = useState("");
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [fundamount, setfundamount] = useState("");
  const [withdrawamount, setwithdrawamount] = useState("");
  const [balance, setbalance] = useState("");
  useEffect(() => {
    async function initialize() {
      if (typeof window.ethereum !== undefined) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const contract = new ethers.Contract(contractadd, abi, signer);
        setAddress(address);
        setContract(contract);
      }
    }
    initialize();
  });
  async function fund() {
    const log = await contract?.fund({ value: fundamount });
    console.log(log);
  }

  async function withdraw() {
    const log = await contract?.withdraw(withdrawamount);
    console.log(log);
  }

  async function getBalance() {
    const log = await contract?.getBalance();
    console.log(log);
    setbalance(log.toString());
  }

  getBalance();
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <Navbar />
      <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-full max-w-2xl">
        <h1 className="text-2xl font-semibold mb-4 text-center">Wallet Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700">Deposit Amount</label>
            <input
              type="number"
              onChange={(e) => setfundamount(e.target.value)}
              placeholder="Enter deposit value"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={fund}
              className="mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Deposit
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700">Withdraw Amount</label>
            <input
              type="number"
              onChange={(e) => setwithdrawamount(e.target.value)}
              placeholder="Enter withdrawal value"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={withdraw}
              className="mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Withdraw
            </button>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-800 font-medium">Current Balance: {balance}</p>
          <p className="mt-2 text-sm text-gray-500">Address: {address}</p>
        </div>
      </div>
    </main>
  );
}