import PropTypes from "prop-types";
import React, { Component } from "react";
import {
    Container,
    Grid,
    Header,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
    Search
} from "semantic-ui-react";
import EpisodeBox from "./EpisodeBox";
import Mailchimp from "./mailChimp";
import FeedReader from "./services/feedReader";
import { Parallax } from 'react-parallax';

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
    const isSSR = typeof window === "undefined";

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class SubscribePage extends React.Component {
    render() {
        return (
            <Mailchimp
                action="https://diwebsity.us13.list-manage.com/subscribe/post?u=0c124adc446c623daa922e46a&amp;id=262b01e404"
                //Adding multiple fields:
                fields={[
                    {
                        name: "EMAIL",
                        placeholder: "Email",
                        type: "email",
                        required: true
                    },
                    {
                        name: "FNAME",
                        placeholder: "Imię",
                        type: "text",
                        required: true
                    }
                ]}
                // Change predetermined language
                messages={{
                    sending: "Wysyłanie...",
                    success: "Dziękuję za zapisanie się!",
                    error: "Nieoczekiwany błąd techniczny. Spróbuj ponownie",
                    empty: "Musisz wpisać adres email.",
                    duplicate: "Już jestes zapisany",
                    button: "Subskrybuj!"
                }}
                // Add a personalized class
                className=""
            />
        );
    }
}

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
    <Container text>
        <Header
            as="h1"
            content="Życiowy architekt"
            inverted
            style={{
                fontSize: mobile ? "2em" : "4em",
                fontWeight: "normal",
                marginBottom: 0,
                marginTop: mobile ? "1.5em" : "3em"
            }}
        />
        <Header
            as="h2"
            content="Podcast o analizowaniu tego co dookoła nas i projektowaniu udanego życia."
            inverted
            style={{
                fontSize: mobile ? "1.5em" : "1.7em",
                fontWeight: "normal",
                marginTop: mobile ? "0.5em" : "1.5em"
            }}
        />
        <p>
            Jeżeli chcesz otrzymywać powiadomienia mailowe o nowych odcinkach to
            zostaw swój email
    </p>
        <SubscribePage />
    </Container>
);

HomepageHeading.propTypes = {
    mobile: PropTypes.bool
};

class SearchEpisode extends Component {
    initialState = { isLoading: false, results: [], value: "" };

    state = this.initialState;

    constructor() {
        super();
        new FeedReader().readFeed().then(result => {
            this.setState({
                episodes: result
            });
        });
    }

    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.title });
        document.getElementById(result.guid).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value });

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(this.initialState);

            const re = new RegExp(this.state.value, "i");
            const isMatch = result => re.test(result.title);

            this.setState({
                isLoading: false,
                results: this.state.episodes.filter(isMatch),
                episodes: this.state.episodes
            });
        }, 300);
    };

    resultRenderer = ({ title }) => <div className="title">{title}</div>;

    render() {
        const { isLoading, value, results } = this.state;
        return (<Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            resultRenderer={this.resultRenderer}
        />);
    }
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {


    hideFixedMenu = () => this.setState({ fixed: false });
    showFixedMenu = () => this.setState({ fixed: true });





    render() {
        const { children } = this.props;


        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                     <Parallax
            bgImage={'../img/tree-headline.jpg'}
            bgImageAlt="the cat"
            bgImageStyle={{
                height: 'auto'
                // padding: '50vh 30vw',
                // background: 'url(../img/tree-headline.jpg)',
                // backgroundSize: 'cover'
            }}
            strength={1000}
            blur={{ min: -15, max: 15 }}
        >
             <Segment
                        inverted
                        textAlign="center"
                        style={{
                            minHeight: 700,
                            padding: "0em 0em",
                            backgroundColor: 'transparent'
                        }}
                        vertical
                    >
                        <Menu 
                            size="large"
                            style={{ borderWidth: 0, backgroundColor: "#FFFFFF88" }}
                        >
                            <Menu.Item >
                                <a
                                    className="podcast-link"
                                    href="https://itunes.apple.com/us/podcast/%C5%BCyciowy-architekt/id1456397363?mt=2&amp;uo=4"
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    <img
                                        src="img/apple_podcasts.png"
                                        alt="Apple Podcasts Logo"
                                        width="28"
                                        height="28"
                                    />

                                </a>
                                <a
                                    className="podcast-link"
                                    href="https://www.breaker.audio/zyciowy-architekt"
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    <img
                                        src="img/breaker.png"
                                        alt="Breaker Logo"
                                        width="28"
                                        height="28"
                                    />
                                </a>

                                <a className="podcast-link" href="https://www.google.com/podcasts?feed=aHR0cHM6Ly9hbmNob3IuZm0vcy85YzBlYzFjL3BvZGNhc3QvcnNz" target="_blank" rel="noopener noreferrer">
                                    <img src="img/google_podcasts.png" alt="Google Podcasts Logo" width="28" height="28" />
                                </a>

                                <a className="podcast-link" href="https://overcast.fm/itunes1456397363/yciowy-architekt" target="_blank" rel="noopener noreferrer">
                                    <img src="img/overcast.png" alt="Overcast Logo" width="28" height="28" />
                                </a>

                                <a className="podcast-link" href="https://pca.st/Pr93" target="_blank" rel="noopener noreferrer">
                                    <img src="img/pocket_casts.png" alt="Pocket Casts Logo" width="28" height="28" />
                                </a>
                                <a className="podcast-link" href="https://radiopublic.com/yciowy-architekt-WaVvQx" target="_blank" rel="noopener noreferrer">
                                    <img src="img/radiopublic.png" alt="RadioPublic Logo" width="28" height="28" />
                                </a>

                                <a className="podcast-link" href="https://open.spotify.com/show/7z5x0O4TZzksMhc2YJBqn6" target="_blank" rel="noopener noreferrer">
                                    <img src="img/spotify.png" alt="Spotify Logo" width="28" height="28" />
                                </a>


                            </Menu.Item>
                            <Menu.Item position="right">
                                <SearchEpisode />
                            </Menu.Item>
                        </Menu>
                        <HomepageHeading />
                    </Segment>
        </Parallax>
                   
                </Visibility>

                {children}
            </Responsive>
        );
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node
};

class MobileContainer extends Component {
    state = {};

    handleSidebarHide = () => this.setState({ sidebarOpened: false });

    handleToggle = () => this.setState({ sidebarOpened: true });

    render() {
        const { children } = this.props;
        const { sidebarOpened } = this.state;

        return (
            <Responsive
                as={Sidebar.Pushable}
                getWidth={getWidth}
                maxWidth={Responsive.onlyMobile.maxWidth}
            >
                <Sidebar
                    as={Menu}
                    animation="push"
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={sidebarOpened}
                >
                    <Menu.Item as="a" active>
                        Home
          </Menu.Item>
                    <Menu.Item as="a">Work</Menu.Item>
                    <Menu.Item as="a">Company</Menu.Item>
                    <Menu.Item as="a">Careers</Menu.Item>
                    <Menu.Item as="a">Log in</Menu.Item>
                    <Menu.Item as="a">Sign Up</Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                <Parallax
            bgImage={'../img/tree-headline.jpg'}
            bgImageAlt="the cat"
            bgImageStyle={{
                // padding: '50vh 30vw',
                // background: 'url(../img/tree-headline.jpg)',
                // backgroundSize: 'cover'
                height:'auto'
            }}
            strength={1000}
            blur={{ min: -15, max: 15 }}
        >
                    <Segment
                        inverted
                        textAlign="center"
                        style={{
                            minHeight: '350',
                            padding: "1em 0em",
                            backgroundColor: 'transparent'
                            //background: `url("img/tree-headline.jpg")`,
                            //backgroundSize: "cover"
                        }}
                        vertical
                    >
                        <Container>
                            <Menu secondary size="large">
                                <Menu.Item position="right">
                                    <SearchEpisode />
                                </Menu.Item>
                            </Menu>
                        </Container>
                        <HomepageHeading mobile />
                    </Segment>
                    </Parallax>

                    {children}
                </Sidebar.Pusher>
            </Responsive>
        );
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
);

ResponsiveContainer.propTypes = {
    children: PropTypes.node
};

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
            });
        });
    }

    render() {
        return (
            <ResponsiveContainer>
                {this.state.episodes.map((episode, i) => (
                    <EpisodeBox key={episode.guid} episode={episode} />
                ))}

                <Segment inverted vertical style={{ padding: "5em 0em" }}>
                    <Container>
                        <Grid divided inverted stackable>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <p>zyciowyarchitekt@gmail.com</p>
                                    <p>
                                        Copyright &copy;{" "}
                                        <a href="https://www.diwebsity.com/">Diwebsity</a>
                                    </p>

                                    <div>
                                        <a
                                            href="https://www.addtoany.com/add_to/facebook?linkurl=http%3A%2F%2Fzyciowyarchitekt.pl%2F&amp;linkname="
                                            target="_blank" rel="noopener noreferrer"
                                        >
                                            <img
                                                src="https://static.addtoany.com/buttons/facebook.svg"
                                                width="32"
                                                height="32"
                                                alt="facebook share"
                                            />
                                        </a>
                                        <a
                                            href="https://www.addtoany.com/add_to/twitter?linkurl=http%3A%2F%2Fzyciowyarchitekt.pl%2F&amp;linkname="
                                            target="_blank" rel="noopener noreferrer"
                                        >
                                            <img
                                                src="https://static.addtoany.com/buttons/twitter.svg"
                                                width="32"
                                                height="32"
                                                alt="twitter share"
                                            />
                                        </a>
                                        <a
                                            href="https://www.addtoany.com/add_to/email?linkurl=http%3A%2F%2Fzyciowyarchitekt.pl%2F&amp;linkname="
                                            target="_blank" rel="noopener noreferrer"
                                        >
                                            <img
                                                src="https://static.addtoany.com/buttons/email.svg"
                                                width="32"
                                                height="32"
                                                alt="email share"
                                            />
                                        </a>
                                        <a
                                            href="https://www.addtoany.com/add_to/linkedin?linkurl=http%3A%2F%2Fzyciowyarchitekt.pl%2F&amp;linkname="
                                            target="_blank" rel="noopener noreferrer"
                                        >
                                            <img
                                                src="https://static.addtoany.com/buttons/linkedin.svg"
                                                width="32"
                                                height="32"
                                                alt="linkedin share"
                                            />
                                        </a>
                                        <a
                                            href="https://www.addtoany.com/add_to/wykop?linkurl=http%3A%2F%2Fzyciowyarchitekt.pl%2F&amp;linkname="
                                            target="_blank" rel="noopener noreferrer"
                                        >
                                            <img
                                                src="https://static.addtoany.com/buttons/wykop.svg"
                                                width="32"
                                                height="32"
                                                alt="wykop share"
                                            />
                                        </a>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Segment>
            </ResponsiveContainer>
        );
    }
}

export default HomepageLayout;
