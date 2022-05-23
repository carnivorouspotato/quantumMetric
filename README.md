# API Test Automation Code Challenge

## Overview

The Quality Engineering, Platform Services coding challenge involves testing a public GraphQL API for a series of scenarios described below.

This type of application is difficult to accomplish via coderpad, so please submit a GitHub link or a zip archive with your work. Also be sure to include documentation that describes your approach, how to build and run your application, and any other considerations that you want to include with your submission. 

Using the countries API available from https://graphql.country/ (known from here forward as 'the API') as your system under test, please create a small API test suite using either Golang or NodeJS to fulfill the following three primary scenarios that might need to be supported.

You may need to use additional resources for validation, and we encourage you to be creative with how you determine the source of truth for validating the data returned from this API! 

## Scenarios

### Scenario 1: 

1. Construct a series of queries against the API that search for the full response available for the Full Name, Native Name, ISO 3166-1 2 and 3-letter country codes of Vatican City, the world's smallest country, then in your test code compare each response to ensure that the data returned through each query is the same. 

### Scenario 2: 

2. Construct a query against the API that returns all countries that speak English, then in your test code create a scenario that loops through the edges array in the response and validates that the name for each country is correct.
  
### Scenario 3:

3. Construct a query against the API that lists all countries that use the Euro currency, then utilizing the response - generate downstream queries that take each country returned from the first query and runs a following query to list their dominant spoken language, then in your test code create a scenario that loops through the responses and validates the main language of each country. 

