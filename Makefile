REPO_ROOT := $(shell git rev-parse --show-toplevel)
include $(REPO_ROOT)/shared.mk

.PHONY: changeset
changeset:
	pnpm exec changeset
	pnpm exec changeset version
	@echo "Now commit your changes"

.PHONY: release
release:
	pnpm run reset-all
	pnpm publish -r
