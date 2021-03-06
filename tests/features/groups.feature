Feature: Operations with groups

  Background: Prepared database and logged user
    Given the database with some clients, groups and courses
    And the logged user

  @add @groups @fast.row<row.id>
  Scenario Outline: Add valid group
    When user adds new group "<name>" for course "<course>" with activity "<active>" and clients "<member_full_name1>" and "<member_full_name2>"
    Then the group is added

    Examples: Groups
      | name      | course       | active | member_full_name1 | member_full_name2 |
      | Slabika 3 | Kurz Slabika | True   | Rod Lukáš         | Uhlíř Jaroslav    |
      | Slabika 3 | Kurz Slabika | True   |                   |                   |
      | Slabika 3 | Kurz Slabika | False  | Rod Lukáš         | Uhlíř Jaroslav    |
      # neaktivni klient
      | Slabika 3 | Kurz Slabika | True   | Neaktivní Pavel   |                   |
      # neaktivni i aktivni klient
      | Slabika 3 | Kurz Slabika | True   | Neaktivní Pavel   | Rod Lukáš         |

  @add @groups
  Scenario Outline: Add invalid group
    When user adds new group "<name>" for course "<course>" with activity "<active>" and clients "<member_full_name1>" and "<member_full_name2>"
    Then the group is not added

    Examples: Groups
      | name      | course           | active | member_full_name1 | member_full_name2 |
      # chybejici nazev/kurz
      |           | Kurz Slabika     | True   |                   |                   |
      | Slabika 3 |                  | True   |                   |                   |
      |           |                  | True   |                   |                   |
      # neexistujici kurz
      | Slabika 3 | blabla           | True   |                   |                   |
      # skryty kurz
      | Slabika 3 | Máme doma leváka | True   |                   |                   |
      # duplicitni nazev skupiny
      | Slabika 1 | Kurz Slabika     | True   |                   |                   |

  @edit @groups
  Scenario: Edit group that has members
    When user updates the data of group "Slabika 1" to name "Slabika 3", course "Předškolák s ADHD", activity "False" and clients to "Rod Lukáš", "Uhlíř Jaroslav" and "Rodová Petra"
    Then the group is updated

  @edit @groups
  Scenario: Edit group that has no members
    When user updates the data of group "Slabika 2" to name "Slabika 3", course "Předškolák s ADHD", activity "False" and clients to "Rod Lukáš", "Uhlíř Jaroslav" and "Rodová Petra"
    Then the group is updated

  @delete @groups
  Scenario: Delete group
    When user deletes the group "Slabika 1"
    Then the group is deleted
