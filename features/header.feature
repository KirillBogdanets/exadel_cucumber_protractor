@header
Feature: Header

    Background:
        Given I Disable protractor synchronization
        When I should be on "Home" page

    @smoke
    @ticket_01
    Scenario: Verify that user is able to see all necessary elements at the Header on Home Page
        Then Element "HomePage > Header > HeaderLogo" should be visible
          And Element "HomePage > Header > ServicesButton" should be visible
          And Element "HomePage > Header > OurWorkButton" should be visible
          And Element "HomePage > Header > AboutButton" should be visible
          And Element "HomePage > Header > NewsButton" should be visible
          And Element "HomePage > Header > ContactButton" should be visible
          And Element "HomePage > Header > CallUsNumber" should be visible
          And Element "HomePage > Header > LanguageBlock" should be visible

    @smoke
    @ticket_02
    Scenario Outline: Verify that user is able to see all items in all dropdowns on the Header
        When I hover mouse over "HomePage > Header > <Header Buttons>"
        Then Collection "HomePage > Header > <Header Dropdown Items>" should be visible
          And Count of "HomePage > Header > <Header Dropdown Items>" elements should be equal "<Number of Items>"
        
        Examples:
            | Header Dropdown Items    | Number of Items    | Header Buttons     |
            | ServicesDropdownItems    | 6                  | ServicesButton     |
            | OurWorkDropdownItems     | 6                  | OurWorkButton      |
            | AboutDropdownItems       | 4                  | AboutButton        |
            | NewsDropdownItems        | 2                  | NewsButton         |
            
    @smoke
    @ticket_03
    Scenario: Verify that default language is English at the Header on Home Page
        Then Text of "HomePage > Header > SelectedLanguage" element should be equal to "English" ignoring case
        When I click "HomePage > Header > LanguageBlock" element
        Then Collection "HomePage > Header > Languages" should be present
          And Count of "HomePage > Header > Languages" elements should be equal "3"