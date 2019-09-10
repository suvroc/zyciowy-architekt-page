import React from "react";
import {
  Button,
  Header,
  Icon,
  Segment,
  Accordion
} from 'semantic-ui-react'

class EpisodeBox extends React.Component {

  state = {

  }

  constructor(props) {
    super(props);
    this.state = {
      detailsOpened: false,
      title: props.episode.title,
      description: props.episode.description,
      embedlink: props.episode.embedlink,
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
    const { detailsOpened, title, description, 
      reference, guid,
      embedlink } = this.state;
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
        {detailsOpened && <iframe title="iFrameName" src={embedlink} width="100%" frameBorder="0" scrolling="no"></iframe>}
      </Segment>
    );
  }
}

export default EpisodeBox;
