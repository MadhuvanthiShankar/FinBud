import { Request, Response } from "express";
import express from "express";
import FinancialRecordModel from "../schema/financial-record";

const router = express.Router();

// Route to get all records by userId
router.get("/getAllByUserID/:userId", async (req: Request, res: Response): Promise<Response | undefined> => {
  try {
    const userId = req.params.userId;
    const records = await FinancialRecordModel.find({ userId: userId });
    if (records.length === 0) {
      return res.status(404).send("No records found for the user");
    }
    res.status(200).json(records); // Prefer `json` for returning arrays/objects
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// Route to create a new record
router.post("/", async (req: Request, res: Response) => {
  try {
    const newRecordBody = req.body;
    const newRecord = new FinancialRecordModel(newRecordBody);
    const savedRecord = await newRecord.save();

    res.status(201).json(savedRecord); // HTTP status 201 for resource creation
  } catch (err) {
    console.error("Error saving record:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to update a record by id
router.put("/:id", async (req: Request, res: Response): Promise<Response | undefined> => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true, runValidators: true } // Ensure validations are run if they are set on your schema
    );

    if (!record) return res.status(404).send("Record not found");
    res.status(200).json(record); // Return updated record
  } catch (err) {
    console.error("Error updating record:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Route to delete a record by id
router.delete("/:id", async (req: Request, res: Response): Promise<Response | undefined> => {
  try {
    const id = req.params.id;
    const record = await FinancialRecordModel.findByIdAndDelete(id);
    if (!record) return res.status(404).send("Record not found");
    res.status(200).send("Record deleted successfully");
  } catch (err) {
    console.error("Error deleting record:", err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
