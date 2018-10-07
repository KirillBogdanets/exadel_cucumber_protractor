@home
Feature: Home Page

    Background:
        Given I Disable protractor synchronization
        When I should be on "Home" page

    @smoke
    @ticket_07
    Scenario: Verify that user is able to see all necessary blocks on the Home Page while scrolling down
        Then Element "HomePage > ExadelBlock" should be visible
          And "HomePage > ExadelInfo" element should be in viewport
          And "HomePage > SpeakWithExpertsLink" element should be in viewport
        When I scroll to the "HomePage > ServicesBlock" element
        Then "HomePage > ViewAllServisesLink" element should be in viewport
          And "HomePage > #1 of ServiceImages" element should be in viewport
        When I scroll to the "HomePage > NewsBlock" element
        Then "HomePage > BlogColumn" element should be in viewport
          And "HomePage > LocationColumn" element should be in viewport
          And Element "HomePage > ReadMoreButton" should be clickable
          And Element "HomePage > SeeOurLocationButton" should be clickable
        When I scroll to the "HomePage > OurWorkBlock" element
        Then "HomePage > OurWorkBlockClientsFeedBacksLink" element should be in viewport
          And Element "HomePage > OurWorkBlockClientsFeedBacksLink" should be clickable
        When I scroll to the "HomePage > ClientslogoBlock" element
        Then "HomePage > #1 of ClientsLogos" element should be in viewport
        When I scroll to the "HomePage > ContactUsBlock" element
        Then "HomePage > ContactUsLink" element should be in viewport
          And Element "HomePage > ContactUsLink" should be clickable