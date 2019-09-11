import React from "react";
import {
  Button,
  Header,
  Icon,
  Segment,
  Accordion,
  Item
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
<div>

      <Segment id={guid} style={{ marginTop: "15px", marginBottom: "15px" }} className="episode-box ">

      <Item.Group>
    <Item align="left">
      <Item.Image size='small' src='https://s3-us-west-2.amazonaws.com/anchor-generated-image-bank/production/podcast_uploaded400/1536383/1536383-1552496098686-1a2dd899c5da9.jpg' />

      <Item.Content>
        <Item.Header>
        <Header as="h2">
          {title}
        </Header></Item.Header>
        <Item.Description>
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
        </Item.Description>
      </Item.Content>
    </Item>
    </Item.Group>

        
       

        
        {detailsOpened && <iframe title="iFrameName" src={embedlink} width="100%" frameBorder="0" scrolling="no"></iframe>}
      </Segment>
      </div>
    );
  }
}

export default EpisodeBox;
