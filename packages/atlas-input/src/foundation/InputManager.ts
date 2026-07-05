import type { InputDevice, InputEventModel, InputState } from './InputModel';

export class InputManager {
  private state: InputState = { events: [], devices: [] };

  public registerDevice(device: InputDevice): void {
    this.state = { ...this.state, devices: [...this.state.devices, device] };
  }

  public record(event: InputEventModel): void {
    this.state = { ...this.state, events: [...this.state.events, event] };
  }

  public current(): InputState {
    return this.state;
  }
}
