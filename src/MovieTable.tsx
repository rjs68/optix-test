import { useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Movie, MovieCompany, MovieTableData, MovieTableProps, Order } from './MovieTypes';
import { useSelector } from 'react-redux';
import { getMovieCompanies, getMovies } from './moviesReducer';

const mockMovieCompanyData: MovieCompany[] = [
    {id: "1", name: "Test Productions"},
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

export const MovieTable = ({ setSelectedMovie }: MovieTableProps) => {
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof MovieTableData>('reviews');
    const movies = useSelector(getMovies);
    const movieCompanies = useSelector(getMovieCompanies);

    const handleRequestSort = (
        event: React.MouseEvent<HTMLElement>,
        property: keyof MovieTableData,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const createData = (movie: Movie): MovieTableData => {
        return {
            id: movie.id,
            title: movie.title,
            reviews: movie.reviews.reduce((acc: any, i: any) => (acc + i)/movie.reviews.length, 0)?.toString().substring(0, 3),
            filmCompany: movieCompanies.find((f: any) => f.id === movie.filmCompanyId)?.name || 'Unknown'
        }
    }

    const sortedMovies = movies.map((movie) => createData(movie)).sort(getComparator(order, orderBy));

    const handleClick = (event: React.MouseEvent<HTMLElement>, movie: MovieTableData) => {
        setSelectedMovie(movie);
    };

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
                  hover
                  key={movie.id}
                  sx={{ cursor: 'pointer' }}
                  onClick={(event) => handleClick(event, movie)}
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