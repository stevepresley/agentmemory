import { afterEach, describe, expect, it, vi } from "vitest";
import { isContextInjectionEnabled } from "../src/config.js";
import { isInjectContextEnabled } from "../src/inject-context.js";

describe("isInjectContextEnabled", () => {
  it.each(["1", "true", "TRUE", "True", " 1 ", " true "])("enables %j", (raw) => {
    expect(isInjectContextEnabled(raw)).toBe(true);
  });

  it.each([undefined, "", "0", "false", "yes", "on"])("disables %j", (raw) => {
    expect(isInjectContextEnabled(raw)).toBe(false);
  });
});

describe("isContextInjectionEnabled", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it.each(["1", "true", "TRUE"])("treats process env %j as on", (value) => {
    vi.stubEnv("AGENTMEMORY_INJECT_CONTEXT", value);
    expect(isContextInjectionEnabled()).toBe(true);
  });

  it.each(["", "false", "yes"])("treats process env %j as off", (value) => {
    vi.stubEnv("AGENTMEMORY_INJECT_CONTEXT", value);
    expect(isContextInjectionEnabled()).toBe(false);
  });
});
