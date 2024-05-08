import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  InputGroup,
  Row,
  Button,
} from "react-bootstrap";
// import { BsSearch } from "react-icons/bs";
import "./Header.css";
import { useContext, useState } from "react";
import langugagesData from "../data/languages.json";
import { useDebouncedCallback } from "use-debounce";
//Context
import { ThemeContext } from "../Context/themeContext";

const Header = (props) => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [inputSearch, setInputSearch] = useState("");

  const debouncedInput = useDebouncedCallback(
    (value) => {
      props.setInputSearch(value);
    },
    // delay in ms
    1000
  );

  const handleInputSearch = (inputValue) => {
    setInputSearch(inputValue);
    debouncedInput(inputValue);
  };

  const handleSortByStars = () => {
    props.setSortByForks("");
    if (props.sortByStars === "desc") props.setSortByStars("asc");
    else props.setSortByStars("desc");
  };
  const handleSortByForks = () => {
    props.setSortByStars("");
    if (props.sortByForks === "desc") props.setSortByForks("asc");
    else props.setSortByForks("desc");
  };

  return (
    <Navbar bg={theme.mode} variant={theme.mode} className="navbar" id="header">
      {/* Desktop Title */}
      <Navbar.Brand href="#home" className="navbar__brand d-none d-sm-block">
        Find Me Issues
      </Navbar.Brand>

      {/* Mobile Title & Mode Button */}
      <Container className="navbar__container--mobile d-sm-none">
        <Navbar.Brand href="#home" className="navbar__brand">
          Find Me Issues
        </Navbar.Brand>
        <Button onClick={changeTheme} size="sm">
          <i
            className={theme.mode === "light" ? "fa fa-moon-o" : "fa fa-sun-o"}
            aria-hidden="true"
          />
        </Button>
      </Container>

      {/* Desktop Search & Select Double Bar */}
      <Container className="navbar__searchbars--desktop d-none d-sm-flex">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text className="inputgroup__prepend__text">
              <Container className="iconContainer">
                <i
                  className={
                    theme.mode === "light" ? "fa fa-moon-o" : "fa fa-sun-o"
                  }
                  aria-hidden="true"
                />
              </Container>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="text"
            value={inputSearch}
            placeholder="Search..."
            onChange={(e) => handleInputSearch(e.target.value)}
            className="navbar__search"
          />
        </InputGroup>

        <InputGroup.Prepend>
          <InputGroup.Text className="inputgroup__divider">
            <Container className="iconContainer">|</Container>
          </InputGroup.Text>
        </InputGroup.Prepend>

        {/* <InputGroup.Prepend className="inputgroup__divider">
          <InputGroup.Text className="inputgroup__divider__text">
            |
          </InputGroup.Text>
        </InputGroup.Prepend> */}
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text className="inputgroup__prepend__text">
              <Container className="iconContainer">
                <i
                  className={
                    theme.mode === "light" ? "fa fa-moon-o" : "fa fa-sun-o"
                  }
                  aria-hidden="true"
                />
              </Container>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            as="select"
            defaultValue={props.language}
            title={props.language}
            id="basic-nav-dropdown"
            className="navbar__search"
          >
            {langugagesData.languages.map((lang, index) => {
              return (
                <option
                  key={index}
                  onClick={() => {
                    props.setLanguage(lang);
                  }}
                >
                  {lang}
                </option>
              );
            })}
          </Form.Control>
          <InputGroup.Prepend>
            <InputGroup.Text className="inputgroup__prepend__text">
              <Container className="iconContainer">
                <i
                  className={
                    theme.mode === "light" ? "fa fa-moon-o" : "fa fa-sun-o"
                  }
                  aria-hidden="true"
                />
              </Container>
            </InputGroup.Text>
          </InputGroup.Prepend>
        </InputGroup>
      </Container>

      {/* Mobile Search Bar */}
      <InputGroup className="d-sm-none">
        <InputGroup.Prepend>
          <InputGroup.Text className="inputgroup__prepend__text">
            <Container className="iconContainer">
              <i
                className={
                  theme.mode === "light" ? "fa fa-moon-o" : "fa fa-sun-o"
                }
                aria-hidden="true"
              />
            </Container>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          type="text"
          value={inputSearch}
          placeholder="Search..."
          onChange={(e) => handleInputSearch(e.target.value)}
          className="navbar__search"
        />
      </InputGroup>

      {/* Mobile Select Bar */}
      <Form.Control
        as="select"
        title={props.language}
        id="basic-nav-dropdown"
        defaultValue={props.language}
        className="d-sm-none"
      >
        {langugagesData.languages.map((lang, index) => {
          return (
            <option
              key={index}
              onClick={() => {
                props.setLanguage(lang);
              }}
            >
              {lang}
            </option>
          );
        })}
      </Form.Control>

      {/* Desktop Mode Button */}
      <Button onClick={changeTheme} size="sm" className="d-none d-sm-block">
        <i
          className={theme.mode === "light" ? "fa fa-moon-o" : "fa fa-sun-o"}
          aria-hidden="true"
        />
      </Button>
    </Navbar>
  );
};

export default Header;
