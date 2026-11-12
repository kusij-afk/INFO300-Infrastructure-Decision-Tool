
INFO 300 Infrastructure Decision Tool

DESCRIPTION:
This Node.js program includes two tools:
1. Subnet Host Checker
2. Compute Environment Selector

REQUIREMENTS:
- Node.js
- readline-sync

INSTALLATION:
Run the following command:
npm install readline-sync

TO RUN:
node index.js

SUBNET HOST CHECKER EXAMPLES:

Example 1 - Sufficient Subnet:
VPC CIDR: /16
Subnet CIDR: /24
Devices required: 100
Usable IP addresses: 251
Unused IP addresses: 151
Result: Sufficient

Example 2 - Insufficient Subnet:
VPC CIDR: /16
Subnet CIDR: /28
Devices required: 20
Usable IP addresses: 11
Additional IP addresses needed: 9
Result: Insufficient

COMPUTE ENVIRONMENT SELECTOR:
The program recommends AWS infrastructure
based on monthly users, budget, and high availability.

AUTHOR:
Jarius Kusi
