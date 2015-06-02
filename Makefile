export NODE_ENV=test

TEST ?= **
MOCHA := ./node_modules/.bin/mocha
MOCHA_ALT := ./node_modules/.bin/_mocha
ISTANBUL := ./node_modules/.bin/istanbul
BOOTSTRAP := test/bootstrap.test.js
UNIT := test/unit/**/*.js
E2E := test/e2e/**/*.js
TESTSUITE = test/$(TEST)/*.js
COVERALLS := ./node_modules/coveralls/bin/coveralls.js

.PHONY: test
test:
	$(MOCHA) $(BOOTSTRAP) $(UNIT)

.PHONY: unit-test
unit-test:
	$(MOCHA) $(BOOTSTRAP) $(UNIT)

.PHONY: e2e-test
e2e-test:
	$(MOCHA) $(BOOTSTRAP) $(E2E)

.PHONY: test-coveralls
test-coveralls:
	$(ISTANBUL) cover $(MOCHA_ALT) --report lcovonly -- $(BOOTSTRAP) $(UNIT) && cat ./coverage/lcov.info | $(COVERALLS) && rm -rf ./coverage

.PHONY: cover
cover:
	$(ISTANBUL) cover $(MOCHA_ALT) -- $(BOOTSTRAP) $(UNIT)

.PHONY: clean
clean:
	-rm -rf coverage
	-rm -rf node_modules

.PHONY: help
help:
	@echo 'Cleaning targets:'
	@echo '  clean               - Remove all generated files'
	@echo '                        (node_modules + coverage)'
	@echo 'Test targets:'
	@echo '  test                - Run all tests'
	@echo '                        (unit + e2e)'
	@echo '  unit-test           - Run unit tests'
	@echo '  e2e-test            - Run end-to-end tests'
	@echo '  cover		      - Generate test coverage reports'
	@echo '                        (runs all tests)'
