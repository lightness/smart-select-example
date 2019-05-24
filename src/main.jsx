class FilterNavbar extends React.Component {
    static propTypes = {
      addCriteria: PropTypes.func,
      criteriasForSelect: PropTypes.array,
      deleteOption: PropTypes.func,
    };
  
    state = {
      collapsed: true,
      selectedCriteria: '',
      value: '',
      disableButton: false,
    };
  
    static getDerivedStateFromProps(nextProps, prevState) {
      console.log(prevState);
      switch (nextProps.criteriasForSelect.length) {
        case 0:
          return {
            disableButton: true,
          };
        case 1:
          return {
            selectedCriteria: nextProps.criteriasForSelect[0].name,
          };
        default:
          return {
            // selectedCriteria: prevState.selectedCriteria,
            disableButton: false,
          };
      }
      // if (
      //   nextProps.criteriasForSelect.length === 1
      //   // !prevState.selectedCriteria
      // ) {
      //   return {
      //     selectedCriteria: nextProps.criteriasForSelect[0].name,
      //     // selectedCriteria: '',
      //     disableButton: true,
      //   };
      // }
      return null;
    }
  
    toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    };
  
    handleSelect = e => {
      this.setState({
        selectedCriteria: e.target.value,
      });
    };
  
    handleTextInput = e => {
      this.setState({
        value: e.target.value,
      });
    };
  
    newCriteria = e => {
      const { selectedCriteria, value } = this.state;
      const { criteriasForSelect } = this.props;
      if (!value) {
        return;
      }
  
      e.preventDefault();
  
      this.props.addCriteria({
        selectedCriteria,
        value,
      });
      const selectedNumber = criteriasForSelect.findIndex(
        item => item.name === selectedCriteria
      );
  
      this.props.deleteOption(selectedCriteria);
      this.setState({
        // selectedCriteria: '',
        selectedCriteria:
          selectedNumber === criteriasForSelect.length - 1
            ? criteriasForSelect[0].name
            : criteriasForSelect[selectedNumber + 1].name,
        collapsed: true,
        value: '',
        // disableButton: true,
      });
      console.log(criteriasForSelect);
    };
  
    render() {
      const { criteriasForSelect, editCriteria } = this.props;
      const { disableButton } = this.state;
      console.log(criteriasForSelect);
      console.log(this.state);
      const { disabled, collapsed, edit } = editCriteria;
      return (
        <Form inline className={styles.form}>
          <div className={styles.topPart}>
            <Button color="secondary">BROWSE ARCHIVE</Button>
            <InputGroup>
              <Input type="text" name="searchText" />
              <Button className={styles.searchButton}>
                <span className={styles.span}>SEARCH</span>
                <FontAwesomeIcon icon={faSearch} />
              </Button>
              <Button
                onClick={this.toggle}
                className={styles.filterButton}>
                +Filter
              </Button>
            </InputGroup>
          </div>
          <Collapse isOpen={!this.state.collapsed || collapsed} navbar>
            <InputGroup className={styles.collapse}>
              {(edit && (
                <Input
                  type="select"
                  name="criteria"
                  id="exampleSelect"
                  onChange={this.handleSelect}
                  className={styles.select}
                  disabled={disabled}>
                  <option value={criteriasForSelect[0].name}>
                    {criteriasForSelect[0].name}
                  </option>
                </Input>
              )) || (
                <Input
                  type="select"
                  name="criteria"
                  id="exampleSelect"
                  onChange={this.handleSelect}
                  className={styles.select}
                  disabled={disabled}>
                  {criteriasForSelect.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </Input>
              )}
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="filterText" className="mr-sm-2">
                  matches
                </Label>
                <Input
                  type="text"
                  name="filterText"
                  id="filterText"
                  autoFocus={edit}
                  value={this.state.value}
                  onChange={this.handleTextInput}
                />
              </FormGroup>
              {/* <Button
                onClick={this.newCriteria}
                disabled={disableButton}>
                ADD
              </Button> */}
              {(edit && (
                <Button onClick={this.newCriteria}>UPDATE</Button>
              )) || (
                <Button
                  onClick={this.newCriteria}
                  disabled={disableButton}>
                  ADD
                </Button>
              )}
            </InputGroup>
          </Collapse>
        </Form>
      );
    }
  }
  
  const mapStateToProps = ({ criteriasForSelect, editCriteria }) => {
    return {
      criteriasForSelect,
      editCriteria,
    };
  };
  
  const mapDispatchToProps = {
    addCriteria,
    deleteOption,
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(FilterNavbar);