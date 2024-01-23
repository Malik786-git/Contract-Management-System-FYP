import express from "express";
import { createContract, deleteContract, getAllContracts, getContractById, updateContract, updateContractStatus } from "../controllers/contractController.js";
const router = express.Router();


router.post('/create-contract', createContract);
router.patch('/update-contract-status/:contract_id', updateContractStatus);
router.patch('/update-contract/:contract_id', updateContract);
router.delete('/delete-contract/:contract_id', deleteContract);
router.get('/all-contracts', getAllContracts);
router.get('/single-contract/:contract_id', getContractById);





export default router;
