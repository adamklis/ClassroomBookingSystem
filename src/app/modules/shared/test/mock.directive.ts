import { Component, Directive } from '@angular/core';

export function MockDirective(options: Component): Directive {
  const metadata: Directive = {
    selector: options.selector,
    inputs: options.inputs,
    outputs: options.outputs
  };
  return Directive(metadata)(class _ {}) as any;
}
