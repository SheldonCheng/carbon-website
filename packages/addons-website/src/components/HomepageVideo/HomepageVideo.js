import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { settings } from 'carbon-components';
import { breakpoints } from "@carbon/layout/es";
const { prefix } = settings;

import { ArrowRight20 } from "@carbon/icons-react/es";
import VideoInternal from '@carbon/addons-website/src/components/VideoInternal/VideoInternal'
import PlayPauseButton from '@carbon/addons-website/src/components/PlayPauseButton/PlayPauseButton'

class HomepageVideo extends Component {
  state = {
    playing: true,
    loop: true
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const {loop } = this.state
    
    if (window.matchMedia(`(max-width: ${breakpoints.md.width})`).matches) {
      if( loop ) {
        this.setState({
          loop: false
        })
      } 
    } else {
      if ( !loop ) {
        this.setState({
          loop: true
        })
      }
    }
  }

  onPlayPauseClick = () => {
    this.setState({
      playing: !this.state.playing
    })
  }

  onVideoComplete = () => {
    this.setState({
      playing: false
    })
  }

  render() {
    const {loop, playing} = this.state

    return (
      <div className={`${prefix}--homepage-video-container`}>
        <div className={`${prefix}--homepage-video-wrapper`}>
          <VideoInternal
            loop={loop}
            poster="images/hero-video-poster.jpg"
            src="videos/hero-video.mp4"
            playing={playing}
            onVideoComplete={this.onVideoComplete}
          />
          <div className={`${prefix}--homepage-video-overlay`} />
        </div>
        <div className={`${prefix}--homepage-video-overlay-content ibm--grid`}>
          <div className={`${prefix}--homepage-video-container-cta ibm--row`}>
            <Link className={`${prefix}--homepage-video-cta ibm--offset-md-4 ibm--col-md-2 ibm--offset-lg-8 ibm--col-lg-4`} to="/philosophy/">
              <p className={`${prefix}--type-expressive-heading-03`}>Philosophy</p>
              <div className={`${prefix}--homepage-video-arrow-container`}>
                <ArrowRight20 className={`${prefix}--homepage-video-cta-icon`} />
              </div>
            </Link>
            <Link className={`${prefix}--homepage-video-cta ibm--col-md-2 ibm--col-lg-4`} to="/gallery/">
              <p className={`${prefix}--type-expressive-heading-03`}>Gallery</p>
              <div className={`${prefix}--homepage-video-arrow-container`}>
                <ArrowRight20 className={`${prefix}--homepage-video-cta-icon`} />
              </div>
            </Link>
            <PlayPauseButton onClick={this.onPlayPauseClick} playing={playing} />
          </div>
        </div>
      </div>
    )
  }
}

export default HomepageVideo;