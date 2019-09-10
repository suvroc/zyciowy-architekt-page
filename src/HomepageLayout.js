import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
    Button,
    Container,
    Grid,
    Header,
    Icon,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
    Search
} from 'semantic-ui-react'
import EpisodeBox from './EpisodeBox';
import FeedReader from './services/feedReader';
import Mailchimp from './mailChimp';

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}


class SubscribePage extends React.Component {
      render() {
          return (
            <Mailchimp
            action='https://diwebsity.us13.list-manage.com/subscribe/post?u=0c124adc446c623daa922e46a&amp;id=262b01e404' 
            
            //Adding multiple fields:
            fields={[
              {
                name: 'EMAIL',
                placeholder: 'Email',
                type: 'email',
                required: true
              },
              {
                name: 'FNAME',
                placeholder: 'Imię',
                type: 'text',
                required: true
              }
            ]}
            // Change predetermined language
            messages = {
              {
                sending: "Sending...",
                success: "Thank you for subscribing!",
                error: "An unexpected internal error has occurred.",
                empty: "You must write an e-mail.",
                duplicate: "Too many subscribe attempts for this email address",
                button: "Subskrybuj!"
              }
            }
            // Add a personalized class
            className=''
            />
          )
      }
  }


/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
    <Container text>
        <Header
            as='h1'
            content='Życiowy architekt'
            inverted
            style={{
                fontSize: mobile ? '2em' : '4em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: mobile ? '1.5em' : '3em',
            }}
        />
        <Header
            as='h2'
            content='Podcast o analizowaniu tego co dookoła nas i projektowaniu udanego życia.'
            inverted
            style={{
                fontSize: mobile ? '1.5em' : '1.7em',
                fontWeight: 'normal',
                marginTop: mobile ? '0.5em' : '1.5em',
            }}
        />
        <p>Jeżeli chcesz otrzymywać powiadomienia mailowe o nowych odcinkach to zostaw swój email</p>
        <SubscribePage></SubscribePage>
    </Container>
)

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
    initialState = { isLoading: false, results: [], value: ''}
    
    state = this.initialState;

    constructor() {
        super();
        // this.state = {
        //     episodes: []
        // };
        new FeedReader().readFeed().then(result => {
            this.setState({
                episodes: result
            });
        });
    }

    

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    handleResultSelect = (e, { result }) => { 
        this.setState({ value: result.title });
        document.getElementById(result.guid).scrollIntoView({ 
            behavior: "smooth",
            block: "start"
         });
        
    }

    handleSearchChange = (e, { value }) => {
        
        this.setState({ isLoading: true, value })
    
        setTimeout(() => {
          if (this.state.value.length < 1) return this.setState(this.initialState)
    
          const re = new RegExp(this.state.value, 'i')
          const isMatch = (result) => re.test(result.title)
    
          this.setState({
            isLoading: false,
            results: this.state.episodes.filter(isMatch),
            episodes: this.state.episodes
          })
        }, 300)
      }

      resultRenderer = ({ title }) => <div className="title">{title}</div>

    render() {
        const { children } = this.props
        const { isLoading, value, results } = this.state

        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign='center'
                        style={{
                            minHeight: 700, padding: '0em 0em',
                            //backgroundImage: `url(${"img/tree-headline.jpg"})`,
                            background: `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)),url("img/tree-headline.jpg")`,
                            
                            backgroundSize: 'cover'
                        }}
                        vertical
                    >
                        <Menu
                            // fixed={fixed ? 'top' : null}
                            // inverted={!fixed}
                            // pointing={!fixed}
                            // secondary={!fixed}
                            size='large'
                            style={{ borderWidth: 0, backgroundColor: '#FFFFFF88' }}
                        >
                            
                            {/* <Menu.Item as='a' active>
                                Home
                </Menu.Item>
                            <Menu.Item as='a'>Lista odcinków</Menu.Item>
                            <Menu.Item as='a'>Śledź podcast</Menu.Item>
                            <Menu.Item as='a'>Kontakt</Menu.Item> */}
                            <Menu.Item position='right'>

                                <Search
                                    loading={isLoading}
                                    onResultSelect={this.handleResultSelect}
                                    onSearchChange={this.handleSearchChange}
                                    results={results}
                                    value={value}
                                    resultRenderer={this.resultRenderer}
                                />
                                {/* <Button icon='world' /> */}

                            </Menu.Item>
                            
                        </Menu>
                        <HomepageHeading />
                    </Segment>
                </Visibility>

                {children}
            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

class MobileContainer extends Component {
    state = {}

    handleSidebarHide = () => this.setState({ sidebarOpened: false })

    handleToggle = () => this.setState({ sidebarOpened: true })

    render() {
        const { children } = this.props
        const { sidebarOpened } = this.state

        return (
            <Responsive
                as={Sidebar.Pushable}
                getWidth={getWidth}
                maxWidth={Responsive.onlyMobile.maxWidth}
            >
                <Sidebar
                    as={Menu}
                    animation='push'
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={sidebarOpened}
                >
                    <Menu.Item as='a' active>
                        Home
          </Menu.Item>
                    <Menu.Item as='a'>Work</Menu.Item>
                    <Menu.Item as='a'>Company</Menu.Item>
                    <Menu.Item as='a'>Careers</Menu.Item>
                    <Menu.Item as='a'>Log in</Menu.Item>
                    <Menu.Item as='a'>Sign Up</Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                        inverted
                        textAlign='center'
                        style={{
                            minHeight: 350, padding: '1em 0em',
                            //backgroundImage: `url(${"img/tree-headline.jpg"})`,
                            background: 'linear-gradient(           rgba(0, 0, 0, 0.3),            rgba(0, 0, 0, 0.3)         ),url("img/tree-headline.jpg");background-size: cover',
                            backgroundSize: 'cover'
                        }}
                        vertical
                    >
                        <Container>
                            <Menu inverted pointing secondary size='large'>
                                <Menu.Item onClick={this.handleToggle}>
                                    <Icon name='sidebar' />
                                </Menu.Item>
                                <Menu.Item position='right'>
                                    <Button as='a' inverted>
                                        Log in
                  </Button>
                                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                                        Sign Up
                  </Button>
                                </Menu.Item>
                            </Menu>
                        </Container>
                        <HomepageHeading mobile />
                    </Segment>

                    {children}
                </Sidebar.Pusher>
            </Responsive>
        )
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
)



ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}

class HomepageLayout extends React.Component {

    episodes = [];
    constructor() {
        super();
        this.state = {
            episodes: []
        };
        new FeedReader().readFeed().then(result => {
            this.setState({
                episodes: result
            })
        });
    }



    render() {
        return <ResponsiveContainer>
            {this.state.episodes.map((episode, i) =>
                <EpisodeBox key={episode.guid} episode={episode}
                
                    ></EpisodeBox>)}



            <Segment inverted vertical style={{ padding: '10em 0em' }}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='About' />
                                <List link inverted>
                                    <List.Item as='a'>Sitemap</List.Item>
                                    <List.Item as='a'>Contact Us</List.Item>
                                    <List.Item as='a'>Religious Ceremonies</List.Item>
                                    <List.Item as='a'>Gazebo Plans</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as='h4' content='Services' />
                                <List link inverted>
                                    <List.Item as='a'>Banana Pre-Order</List.Item>
                                    <List.Item as='a'>DNA FAQ</List.Item>
                                    <List.Item as='a'>How To Access</List.Item>
                                    <List.Item as='a'>Favorite X-Men</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header as='h4' inverted>
                                    Footer Header
              </Header>
                                <p>
                                    Extra space for a call to action inside the footer that could help re-engage users.
              </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </ResponsiveContainer>
    }
}

export default HomepageLayout
