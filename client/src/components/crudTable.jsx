import * as React from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import moment from 'moment';


function EditToolbar(props) {
  // const { setRows, setRowModesModel } = props;

  // const handleClick = () => {
  //   const tempId = `temp-${Date.now()}`;
  //   setRows((oldRows) => [...oldRows, { id: tempId, isNew: true }]);
  //   setRowModesModel((oldModel) => ({
  //     ...oldModel,
  //     [tempId]: { mode: GridRowModes.Edit },
  //   }));
  // };
  

  return (
    <GridToolbarContainer>
      {/* <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button> */}
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid({ rows: externalRows, onDelete, onEdit }) {
    const [localRows, setLocalRows] = React.useState(externalRows);
    const [rowModesModel, setRowModesModel] = React.useState({});
  
    React.useEffect(() => {
      setLocalRows(externalRows);
    }, [externalRows]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  
  
  const handleDeleteClick = (id) => () => {
    const rowToDelete = localRows.find((row) => row._id === id);
    if (rowToDelete) {
      onDelete(rowToDelete);
    } else {
      console.error("Row to delete not found", id);
    }
  };
  

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  
    const editedRow = localRows.find((row) => row._id === id);
    if (editedRow && editedRow.isNew) {
      setLocalRows(localRows.filter((row) => row._id !== id));
    }
  };
  

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setLocalRows(localRows.map((row) => (row._id === newRow._id ? updatedRow : row)));
    onEdit(updatedRow);
    return updatedRow;
  }; 
  
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'location', headerName: 'Location', width: 280, editable: false },
    { field: 'service', headerName: 'Service', width: 200, editable: true },
    { field: 'provider', headerName: 'Provider', width: 150, editable: true },
    { 
      field: 'date', 
      headerName: 'Date', 
      width: 150, 
      editable: true,
      valueGetter: (params) => {      
        return moment(params.value).format('YYYY-MM-DD');
      }
    },
    { field: 'time', headerName: 'Time', width: 100, editable: true },
    { field: 'addons', headerName: 'Addons', width: 200, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: 'primary.main',
                }}
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }
    
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      },
    ];
  

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={localRows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        getRowId={(row) => row._id}
        slots={{
            toolbar: EditToolbar,
        }}
        slotProps={{
            toolbar: { setLocalRows, setRowModesModel },
        }}
        />

    </Box>
  );
}
