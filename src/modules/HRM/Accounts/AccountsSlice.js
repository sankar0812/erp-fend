import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../../utils/ApiUrls/Hrm";
import request from "../../../utils/request";

const initialState = {
  expenseType: [],
  expense: [],
  assetBrand: [],
  accessories: [],
  assets: [],
  serverType: [],
  server: [],
  assignAssets: [],
  assignAssetsView: [],
  servermain: [],
  balanceSheet: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get expensetype

export const getExpenseType = createAsyncThunk("expenseType/get", async () => {
  try {
    const expensetype = "expensetype";
    const response = await request.get(`${APIURLS.GETEXPENSETYPE}`, {
      params: { expensetype },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
  }
});

// get expense

export const getExpense = createAsyncThunk("expense/get", async () => {
  try {
    const view = "expensedetails";
    const response = await request.get(`${APIURLS.GETEXPENSE}`, {
      params: { view },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
  }
});

// get brand

export const getAssetsBrand = createAsyncThunk("assetsBrand/get", async () => {
  try {
    const brand = "brand";
    const response = await request.get(`${APIURLS.GETASSETBRAND}`, {
      params: { brand },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
  }
});

// get accessories

export const getAccessories = createAsyncThunk("accessories/get", async () => {
  try {
    const accessories = "accessories";
    const response = await request.get(`${APIURLS.GETASSETACCESSORIES}`, {
      params: { accessories },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
  }
});

// get Assets

export const getAssets = createAsyncThunk("assets/get", async () => {
  try {
    const assest = "Assest";
    const response = await request.get(`${APIURLS.GETASSETS}`, {
      params: { assest },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
  }
});

// get ServerType

export const getServerType = createAsyncThunk("serverType/get", async () => {
  try {
    const serverTypeParam = "serverType";
    const response = await request.get(`${APIURLS.GETSERVERTYPE}`, {
      params: { serverTypeParam },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
  }
}); 

// get server

export const getServer = createAsyncThunk("server/get", async () => {
  try {
    const serverParam = "server";
    const response = await request.get(`${APIURLS.GETSERVER}`, {
      params: { serverParam },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
  }
});

// get Assign Assets
export const getAssignAssets = createAsyncThunk(
  "assignAssets/get",
  async () => {
    try {
      const accessories = "brand";
      const response = await request.get(`${APIURLS.GETASSIGNASSETS}`, {
        params: { accessories },
      });
      return [...response.data];
    } catch (error) {
      // throw error;
    }
  }
);

// get Assign Assets view

export const getAssignAssetsView = createAsyncThunk(
  "assignAssetsView/get",
  async () => {
    try {
      const view = "assets";
      const response = await request.get(`${APIURLS.GETASSIGNASSETSVIEW}`, {
        params: { view },
      });
      return [...response.data];
    } catch (error) {
      // throw error;
    }
  }
);

// get Server Maintenance

export const getServerMaintain = createAsyncThunk(
  "servermaintenances/get",
  async () => {
    try {
      const view = "serverMaintenance";
      const response = await request.get(`${APIURLS.GETSERVERMAINTAIN}`, {
        params: { view },
      });
      return [...response.data];
    } catch (error) {
      // throw error;
    }
  }
);

// Balance sheet
export const getBalanceSheet = createAsyncThunk(
  "BalanceSheet/get",
  async () => {
    try {
      const dashboard = "sheet";
      const response = await request.get(`${APIURLS.GETBALANCESHEET}`, {
        params: { dashboard },
      });
      return [...response.data];
    } catch (error) {
      // throw error;
    }
  }
);

const AccountsSlice = createSlice({
  name: "accountsdetails",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ExpenseType

      .addCase(getExpenseType.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getExpenseType.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expenseType = action.payload;
      })
      .addCase(getExpenseType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Expense

      .addCase(getExpense.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getExpense.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expense = action.payload;
      })
      .addCase(getExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // assets brand

      .addCase(getAssetsBrand.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAssetsBrand.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.assetBrand = action.payload;
      })
      .addCase(getAssetsBrand.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // accessories

      .addCase(getAccessories.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAccessories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accessories = action.payload;
      })
      .addCase(getAccessories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // assets

      .addCase(getAssets.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAssets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.assets = action.payload;
      })
      .addCase(getAssets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // ServerType

      .addCase(getServerType.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getServerType.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.serverType = action.payload;
      })
      .addCase(getServerType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Server

      .addCase(getServer.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getServer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.server = action.payload;
      })
      .addCase(getServer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Server Maintenance View
      .addCase(getServerMaintain.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getServerMaintain.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.servermain = action.payload;
      })
      .addCase(getServerMaintain.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Assign Assets

      .addCase(getAssignAssets.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAssignAssets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.assignAssets = action.payload;
      })
      .addCase(getAssignAssets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Assign Assets View
      .addCase(getAssignAssetsView.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAssignAssetsView.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.assignAssetsView = action.payload;
      })
      .addCase(getAssignAssetsView.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Balance sheet
      .addCase(getBalanceSheet.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBalanceSheet.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.balanceSheet = action.payload;
      })
      .addCase(getBalanceSheet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

// Expensetype

export const selectAllExpenseType = (state) => state.accounts.expenseType;
export const getExpenseTypeStatus = (state) => state.accounts.status;
export const getExpenseTypeError = (state) => state.accounts.error;

// Expense

export const selectAllExpense = (state) => state.accounts.expense;
export const getExpenseStatus = (state) => state.accounts.status;
export const getExpenseError = (state) => state.accounts.error;

// assets brand

export const selectAllAssetsBrand = (state) => state.accounts.assetBrand;
export const getAssetsBrandStatus = (state) => state.accounts.status;
export const getAssetsBrandError = (state) => state.accounts.error;

// accessories

export const selectAllAccessories = (state) => state.accounts.accessories;
export const getAccessoriesStatus = (state) => state.accounts.status;
export const getAccessoriesError = (state) => state.accounts.error;

// assets

export const selectAllAssets = (state) => state.accounts.assets;
export const getAssetsStatus = (state) => state.accounts.status;
export const getAssetsError = (state) => state.accounts.error;

// serverType

export const selectAllServerType = (state) => state.accounts.serverType;
export const getServerTypeStatus = (state) => state.accounts.status;
export const getServerTypeError = (state) => state.accounts.error;

// server

export const selectAllServer = (state) => state.accounts.server;
export const getServerStatus = (state) => state.accounts.status;
export const getServerError = (state) => state.accounts.error;

// server Maintenance

export const selectAllServerMaintain = (state) => state.accounts.servermain;
export const getServerMaintainStatus = (state) => state.accounts.status;
export const getServerMaintainError = (state) => state.accounts.error;

// assign assets

export const selectAllAssignAssets = (state) => state.accounts.assignAssets;
export const getAssignAssetsStatus = (state) => state.accounts.status;
export const getAssignAssetsError = (state) => state.accounts.error;

// assign assets assets

export const selectAllAssignAssetsView = (state) =>state.accounts.assignAssetsView;
export const getAssignAssetsViewStatus = (state) => state.accounts.status;
export const getAssignAssetsViewError = (state) => state.accounts.error;

// balance sheet

export const selectAllBalanceSheet = (state) =>state.accounts.balanceSheet;
export const getBalanceSheetStatus = (state) => state.accounts.status;
export const getBalanceSheetError = (state) => state.accounts.error;

export const { reducer } = AccountsSlice;
export const { addAccounts } = AccountsSlice.actions;

export default AccountsSlice.reducer;
