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

  }

  constructor(props) {
    super(props);
    this.aaa = React.createRef();
    this.state = {
      detailsOpened: false,
      title: props.episode.title,
      description: props.episode.description,
      snippet: "https://anchor.fm/zyciowy-architekt/embed/episodes/8--Dieta-niskoinformacyjna-e50jrh",
      reference: props.episode.reference,
      guid: props.episode.guid
    };
    
  }

  handleAccordionClick = () => {
    this.setState({
      detailsOpened: !this.state.detailsOpened,
    });
  }

  render() {
    const { detailsOpened, title, description, snippet, reference, guid } = this.state;
    console.log(this.aaa);
    return (


      <Segment id={guid} style={{ padding: "3em 0em" }} className="episode-box ">
        <div ref={reference}></div>
        {/* <Container text> */}
        <Header as="h3" style={{ fontSize: "2em" }}>
          {title}
        </Header>
        <p style={{ fontSize: "1.33em" }}
          dangerouslySetInnerHTML={{ __html: description }}>
        </p>

        <Accordion>
          <Accordion.Title active={detailsOpened}>
            <Button as="a" size="large" onClick={this.handleAccordionClick}>
              <Icon name="dropdown" /> Słuchaj teraz
              </Button>
          </Accordion.Title>
        </Accordion>
        {/* </Container> */}
        {detailsOpened && <iframe title="iFrameName" src={snippet} width="100%" frameBorder="0" scrolling="no"></iframe>}
      </Segment>
    );
  }
}

export default EpisodeBox;
