import { useUser } from "@clerk/clerk-react"
import { useMemo } from "react";
import { FinancialRecForm } from "./financial-rec-form";
import { FinancialRecordList } from "./financial-rec-list";
import './financial-records.css'
import { useFinancialRecords } from "../../context/financial-record-context";

export const Dashboard = () => {
    const { user } = useUser();
    const { records } = useFinancialRecords(); 

    const totalMonthly = useMemo(() => {
        let totalAmount = 0;
        records.forEach((record) => {
            totalAmount += record.amount;
        });
        return totalAmount;
    }, [records])
    return (
        <div className="dashboard-container">
            <h1> Welcome {user?.firstName}! Here are your finances</h1>
            <FinancialRecForm />
            <div>Total Monthly: ₹{totalMonthly} </div>
            <FinancialRecordList />
        </div>
    )
}
