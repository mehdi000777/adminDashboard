import React from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useGetPerformanceQuery } from 'state/api';
import Header from 'components/Header';
import CustomColumnMenu from 'components/DataGridCustomColumnMenu'
import { useSelector } from 'react-redux';

const Performance = () => {
    const theme = useTheme();
    const userId = useSelector(state => state.global.userId)
    const { data, isLoading } = useGetPerformanceQuery(userId);
    console.log(data)

    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            flex: 1,
        },
        {
            field: 'userId',
            headerName: 'User ID',
            flex: 0.5,
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            flex: 1,
        },
        {
            field: 'products',
            headerName: '# of Products',
            flex: 0.5,
            sortable: false,
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
            <Header title='PERFORMANCE' subTitle='Tranck Your Affiliate Sales Performance Here' />
            <Box
                mt='40px'
                height='75vh'
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
                    loading={!data || isLoading}
                    rows={(data && data.sales) || []}
                    getRowId={(row) => row._id}
                    columns={columns}
                    components={{
                        ColumnMenu: CustomColumnMenu
                    }}
                />
            </Box>
        </Box>
    )
}

export default Performance;