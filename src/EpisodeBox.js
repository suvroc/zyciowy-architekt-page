import React from "react";
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
    GridColumn,
    Accordion,
    Item
} from 'semantic-ui-react'

class EpisodeBox extends React.Component {

    state = {
        detailsOpened: false
    }    

    constructor(props) {
        super(props);
        this.title = props.title;
        this.description = props.description;
        this.snippet = props.snippet;
        this.setState({
            detailsOpened: false,
            title: props.title,
            description: props.description,
            snippet: { __html: '<iframe src="https://anchor.fm/zyciowy-architekt/embed/episodes/8--Dieta-niskoinformacyjna-e50jrh" width="100%" frameborder="0" scrolling="no/>'}
        });
      }

handleAccordionClick = () => {
    this.setState({
        detailsOpened: !this.state.detailsOpened,
    });
}

  render() {
    return (
      <Segment style={{ padding: "3em 0em" }} className="episode-box ">
        
        {/* <Container text> */}
          <Header as="h3" style={{ fontSize: "2em" }}>
           {this.title}
          </Header>
          <p style={{ fontSize: "1.33em" }} 
            dangerouslySetInnerHTML={{__html: this.description}}>
          </p>

          <Accordion>
            <Accordion.Title active={this.state.detailsOpened}>
              <Button as="a" size="large" onClick={this.handleAccordionClick}>
                <Icon name="dropdown" /> Słuchaj teraz
              </Button>
            </Accordion.Title>
          </Accordion>
        {/* </Container> */}
        { this.state.detailsOpened && <iframe title="iFrameName" src={this.snippet} width="100%" frameBorder="0" scrolling="no"></iframe> }
      </Segment>
    );
  }
}

export default EpisodeBox;
