@footer
Feature: Footer

    Background:
        Given I Disable protractor synchronization
        When I should be on "Home" page

    @smoke
    @ticket_04
    Scenario: Verify that user is able to see all necessary elements at the Footer on Home Page
    Then I scroll to the "HomePage > Footer > Services" element
        And Element "HomePage > Footer > Services" should be visible
          And Element "HomePage > Footer > OurWork" should be visible
          And Element "HomePage > Footer > About" should be visible
          And Element "HomePage > Footer > News" should be visible

    @smoke
    @ticket_05
    Scenario Outline: Verify that user is able to see all items in all tables on the Footer
        Then I scroll to the "HomePage > Footer > <Footer Tables>" element
        Then Collection "HomePage > Footer > <Footer Dropdown Items>" should be visible
          And Count of "HomePage > Footer > <Footer Dropdown Items>" elements should be equal "<Number of Items>"
        
        Examples:
            | Footer Dropdown Items    | Number of Items    | Footer Tables      |
            | ServicesItems            | 6                  | Services           |
            | OurWorkItems             | 6                  | OurWork            |
            | AboutItems               | 4                  | About              |
            | NewsItems                | 2                  | News               | 

    @smoke
    @ticket_06
    Scenario Outline: Verify that dropdowns items at the Header is equal to the tables items at the Footer
        When I hover mouse over "HomePage > Header > <Header Buttons>"
        Then Collection "HomePage > Header > <Header Dropdown Items>" should be visible
        When I remember text of "HomePage > Header > #<Item #> of <Header Dropdown Items>" element as "ItemText"
        Then I scroll to the "HomePage > Footer > <Footer Tables>" element
          And Text of "HomePage > Footer > #<Item #> of <Footer Dropdown Items>" element should be equal to "$ItemText" ignoring case 
        
        Examples:
            | Header Dropdown Items    | Item #      | Header Buttons     | Footer Dropdown Items    | Footer Tables      |
            | ServicesDropdownItems    | 3           | ServicesButton     | ServicesItems            | Services           |
            | OurWorkDropdownItems     | 5           | OurWorkButton      | OurWorkItems             | OurWork            |
            | AboutDropdownItems       | 2           | AboutButton        | AboutItems               | About              |
            | NewsDropdownItems        | 2           | NewsButton         | NewsItems                | News               |        