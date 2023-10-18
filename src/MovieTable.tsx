import { useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

type MovieCompany = {
    id: string;
    name: string;
}

type Movie = {
    id: string;
    reviews: number[];
    title: string;
    filmCompanyId: string;
    cost: number;
    releaseYear: number;
}

type TableData = {
    id: string;
    title: string;
    reviews: string;
    filmCompany: string;
}

type Order = 'asc' | 'desc';

const mockMovieCompanyData: MovieCompany[] = [
    {id: "1", name: "Test Productions"},
  ];

const mockMovieData: Movie[] = [
    {id: "1", reviews: [6,8,3,9,8,7,8], title: "A Testing Film", filmCompanyId: "1", cost : 534, releaseYear: 2005},
    {id: "2", reviews: [5,7,3,4,1,6,3], title: "Mock Test Film", filmCompanyId: "1", cost : 6234, releaseYear: 2006},
];

const descendingComparator = <T,>(a: T, b: T, orderBy: keyof T) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
}

const getComparator = <Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

export const MovieTable = () => {
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof TableData>('reviews');

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof TableData,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const createData = (movie: Movie): TableData => {
        return {
            id: movie.id,
            title: movie.title,
            reviews: movie.reviews.reduce((acc: any, i: any) => (acc + i)/movie.reviews.length, 0)?.toString().substring(0, 3),
            filmCompany: mockMovieCompanyData.find((f: any) => f.id === movie.filmCompanyId)?.name || 'Unknown'
        }
    }
    
    const movies = mockMovieData.map((movie) => createData(movie));

    const sortedMovies = movies.sort(getComparator(order, orderBy));

    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell
                    align="right"
                    sortDirection={order}
                >
                    <TableSortLabel
                        active
                        direction={order}
                        onClick={(event) => handleRequestSort(event, 'reviews')}
                    >
                        Review
                        <Box component="span" sx={visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                    </TableSortLabel>
                </TableCell>
                <TableCell align="right">Film Company</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedMovies.map((movie) => (
                <TableRow
                  key={movie.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {movie.title}
                  </TableCell>
                  <TableCell align="right">{movie.reviews}</TableCell>
                  <TableCell align="right">{movie.filmCompany}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
};