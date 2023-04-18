import React from 'react';
import Header from 'components/Header';
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic
} from '@mui/icons-material';
import {
  Box,
  useTheme,
  Button,
  Typography,
  useMediaQuery
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useGetDashboardQuery } from 'state/api';
import BreakdownChart from 'components/BreakdownChart';
import OverviewChart from 'components/OverviewChart';
import FlexBetween from 'components/FlexBetween';
import StatBox from 'components/StatBox';


const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery('(min-width: 1200px)')
  const { data, isLoading } = useGetDashboardQuery();

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
      <FlexBetween>
        <Header title='DASHBOARD' subTitle='Welcome to your dashboard' />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: '14px',
              padding: '10px 20px'
            }}
          >
            <DownloadOutlined sx={{ mr: '10px' }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>
      <Box
        mt='20px'
        display='grid'
        gridTemplateColumns='repeat(12, 1fr)'
        gridAutoRows='160px'
        gap='20px'
        sx={{
          '& > div': { gridColumn: isNonMediumScreens ? undefined : 'span 12' }
        }}
      >
        {/* Row one */}
        <StatBox
          title='Total Cutsomers'
          value={data && data.totalCustomers}
          increase='+14%'
          description='Since last month'
          icon={
            <Email sx={{ color: theme.palette.secondary[300], fontSize: '26px' }} />
          }
        />
        <StatBox
          title='Sales Today'
          value={data && data.todayStats.totalSales}
          increase='+21%'
          description='Since last month'
          icon={
            <PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: '26px' }} />
          }
        />
        <Box
          gridColumn='span 8'
          gridRow='span 2'
          sx={{ backgroundColor: theme.palette.background.alt }}
          p='1rem'
          borderRadius='0.55rem'
        >
          <OverviewChart view='sales' isDashboard />
        </Box>
        <StatBox
          title='Monthly Sales'
          value={data && data.thisMonthStats.totalSales}
          increase='+5%'
          description='Since last month'
          icon={
            <PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: '26px' }} />
          }
        />
        <StatBox
          title='Yearly Sales'
          value={data && data.yearlySalesTotal}
          increase='+43%'
          description='Since last month'
          icon={
            <Traffic sx={{ color: theme.palette.secondary[300], fontSize: '26px' }} />
          }
        />
        {/* Row two */}
        <Box
          gridColumn='span 8'
          gridRow='span 3'
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
              borderRadius: '5rem'
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
              background: theme.palette.background.alt,
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
            getRowId={(row) => row._id}
            rows={data && data.transactions || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn='span 4'
          gridRow='span 3'
          sx={{ backgroundColor: theme.palette.background.alt }}
          p='1.5rem'
          borderRadius='0.55rem'
        >
          <Typography variant='h6' sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard />
          <Typography p='0 0.6rem' fontSize='0.8rem' sx={{ color: theme.palette.secondary[200] }} >
            Breakdown of real states and information via category for revenue made for this year and total sales.
          </Typography>
        </Box>
      </Box>
    </Box >
  )
}

export default Dashboard;