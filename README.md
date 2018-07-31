# insertPlotDataSet
MongoDB collection to store block of time-stamped random numbers for testing 

Default config is to declare the current time and then specify a previous 
point in time to create a time window that will be populated by an incrementing
timestamp & randomInt datapoint.

Uses moment.js for date / time manipulation
Should explore luxor as a replacement for moment.

Code can be modified for start and end time / date.
Change time increment for coarser or finer time resolution.

Tested with mongoDB 3.4 and node driver 2.2.26


