import React, { useState } from 'react';
import { useGetTransactionsQuery } from 'state/api';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import DataGridCustomToolbar from 'components/DataGridCustomToolbar';

const Transactions = () => {
    const theme = useTheme();

    const [paginationModel, setPaginationModel] = useState({ pageSize: 20, page: 0, });
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const { data, isLoading } = useGetTransactionsQuery({ page: paginationModel.page, pageSize: paginationModel.pageSize, sort: JSON.stringify(sort), search });

    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            flex: 1,
        },
        {
            field: 'userId',
            headerName: 'User ID',
            flex: 1,
        },
        {
            field: 'createdAt',
            headerName: 'CreatedAt',
            flex: 1,
        },
        {
            field: 'products',
            headerName: '# of Products',
            flex: 0.5,
            sortsble: false,
            renderCell: (params) => params.value.length
        },
        {
            field: 'cost',
            headerName: 'Cost',
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        },
    ]


    return (
        <Box m='1.5rem 2.5rem'>
            <Header title='TRANSACTIONS' subTitle='Entire list of transactions.' />
            <Box
                height='80vh'
                mt='40px'
                sx={{
                    '& .MuiDataGrid-root': {
                        border: 'none'
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none'
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        background: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: 'none'
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        background: theme.palette.primary.light,
                    },
                    '& .MuiDataGrid-footerContainer': {
                        background: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: 'none'
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                        color: `${theme.palette.secondary[200]} !important`,
                    }
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={(data && data.transactions) || []}
                    columns={columns}
                    rowCount={(data && data.total) || 0}
                    pageSizeOptions={[20, 50, 100]}
                    paginationModel={paginationModel}
                    paginationMode="server"
                    sortingMode="server"
                    onPaginationModelChange={setPaginationModel}
                    onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                    components={{ Toolbar: DataGridCustomToolbar }}
                    componentsProps={{
                        toolbar: { searchInput, setSearchInput, setSearch }
                    }}
                />
            </Box>
        </Box>
    )
}

export default Transactions;