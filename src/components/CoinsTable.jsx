import { useState, useEffect } from "react"
import { CryptoState } from '../CryptoContext'
import {
  ThemeProvider,
  createTheme,
  Container,
  Typography,
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { Link } from 'react-router-dom'

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const { currency, symbol, coins, loading, fetchCoins } = CryptoState()

  console.log(coins)

  useEffect(() => {
    fetchCoins()
  }, [currency])

  const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#10162f",
      },
      type: "light",
    }
  })

  const handleSearch = () => {
    return coins.filter((coin) =>
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
    )
  }

  const useStyles = makeStyles(() => ({
    row: {
      backgroundColor: "#fff",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#f9fbfe"
      },
      fontFamily: "Inter"
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "#00b7ff"
      }
    }
  }))

  const classes = useStyles()

  return (
    <ThemeProvider theme={lightTheme}>
      <Container style={{ textAlign: 'center' }}>
        <Typography
          variant="h4"
          style={{ margin: 50, fontFamily: 'Inter' }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label="Search for a Crypto Currency..."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {
            loading ? (
              <LinearProgress style={{ backgroundColor: "#00b7ff" }} />
            ) : (
              <Table>
                <TableHead style={{ backgroundColor: "" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                      <TableCell
                        style={{
                          color: "#10162f",
                          fontWeight: "700",
                          fontFamily: "Inter"
                        }}
                        key={head}
                        align={head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0

                      return (
                        <TableRow
                          className={classes.row}
                          key={row.name}
                        >
                          <Link to={`/coins/${row.id}`}>
                            <TableCell
                              component="th"
                              scope="row"
                              style={{
                                display: "flex",
                                gap: 15
                              }}
                            >
                              <img
                                src={row?.image}
                                alt={row.name}
                                height="30"
                                style={{ marginTop: 4, marginRight: 10 }}
                              />
                              <div
                                style={{ display: "flex", flexDirection: "column" }}
                              >
                                <span
                                  style={{ textTransform: "uppercase", fontSize: 18 }}
                                >
                                  {row.symbol}
                                </span>
                                <span style={{ color: "darkgrey" }}>
                                  {row.name}
                                </span>
                              </div>
                            </TableCell>
                          </Link>

                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "#03c03c" : "red",
                              fontWeigh: 500
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}M
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            )
          }
        </TableContainer>

        <Pagination
          style={{
            padding: 20,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          // classes={{ ul: classes.pagination }} ; or
          className={classes.pagination}
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value)
            window.scroll(0, 450)
          }}
        />
      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable