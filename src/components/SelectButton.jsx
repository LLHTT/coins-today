import { makeStyles } from "@material-ui/core"

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectbutton: {
      border: "1px solid #00b7ff",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Inter",
      cursor: "pointer",
      backgroundColor: selected ? "#00b7ff" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "#00b7ff",
        color: "black",
      },
      width: "22%",
      //   margin: 5,
    },
  })

  const classes = useStyles()
  return (
    <span
      onClick={onClick}
      className={classes.selectbutton}
    >
      {children}
    </span>
  )
}

export default SelectButton