import contractModel from "../models/Contract.js";


const createContract = async (req, res) => {
    const { project_name, duration, budget, started_date, end_date } = req.body;
    if (project_name, duration, budget, started_date, end_date) {
        try {
            const createNewContract = new contractModel({
                project_name,
                duration,
                budget,
                started_date,
                end_date,
            });

            const newContract = await createNewContract.save();
            res.status(201).json({ contract: newContract, status: "successful" });

        } catch (error) {
            res.status(500).json({ message: "Internal server error! try later" });
        }
    } else {
        res.status(400).json({ message: "Invalid data, missing required fields" });
    }
}

const updateContractStatus = async (req, res) => {
    const { status } = req.body;
    const { contract_id } = req.params;
    if (status && contract_id) {
        try {
            const findContract = await contractModel.findById(contract_id);
            if (findContract) {
                if (['completed', 'incomplete'].includes(status)) {

                    findContract.status = status;
                    const updatedContract = await findContract.save();
                    res.status(200).json({ contract: updatedContract, status: "successful" });

                } else {
                    res.status(400).json({ message: "Invalid status" });
                }
            } else {
                res.status(400).json({ message: "Invalid id, contract not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error! try later" });
        }
    } else {
        res.status(400).json({ message: "Invalid data, missing required fields" });
    }

}

const updateContract = async (req, res) => {
    const { project_name, duration, budget, started_date, end_date } = req.body;
    const { contract_id } = req.params;

    if (project_name || duration || budget || started_date || end_date) {
        try {
            const findContract = await contractModel.findById(contract_id);

            if (findContract) {
                if (project_name) findContract.project_name = project_name;
                if (duration) findContract.duration = duration;
                if (budget) findContract.budget = budget;
                if (started_date) findContract.started_date = started_date;
                if (end_date) findContract.end_date = end_date;

                const updatedContract = await findContract.save();

                res.status(200).json({ contract: updatedContract, status: "successful" });
            } else {
                res.status(404).json({ message: "Contract not found" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error! Try later" });
        }
    } else {
        res.status(400).json({ message: "No valid data provided for update" });
    }
};

const deleteContract = async (req, res) => {
    const { contract_id } = req.params;
    if (contract_id) {
        try {
            const findContract = await contractModel.findByIdAndDelete(contract_id);
            res.status(200).json({ contract: findContract, message: "Contract deleted successfully", status: "successful" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error! Try later" });
        }
    } else {
        res.status(400).json({ message: "url params missing, invalid request" });
    }

};

const getAllContracts = async (req, res) => {
    try {
        const allContracts = await contractModel.find();
        res.status(200).json({ contracts: allContracts, status: "successful" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error! Try later" });
    }
};

const getContractById = async (req, res) => {
    const { contract_id } = req.params;

    try {
        const findContract = await contractModel.findById(contract_id);
        if (findContract) {
            res.status(200).json({ contract: findContract, status: "successful" });
        } else {
            res.status(404).json({ message: "Contract not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error! Try later" });
    }
};


export {
    createContract,
    updateContractStatus,
    updateContract,
    deleteContract,
    getAllContracts,
    getContractById,
};