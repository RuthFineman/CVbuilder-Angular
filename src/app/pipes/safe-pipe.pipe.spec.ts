
// import { SafePipePipe } from "./safe-pipe.pipe";

// describe('SafePipePipe', () => {
//   it('create an instance', () => {
//     const pipe = new SafePipePipe();
//     expect(pipe).toBeTruthy();
//   });
// });
import { TestBed } from '@angular/core/testing';
import { SafePipePipe } from './safe-pipe.pipe';

describe('SafePipePipe', () => {
  let pipe: SafePipePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SafePipePipe]
    });
    pipe = TestBed.inject(SafePipePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
