export default (api) => ["cycle", api.var(new api.func(
    [
        ["rotations", {
            Type: api.number,
            Default: api.init(api.number, 10, 0, 1)
        }],
        ["counterclockwise", {
            Type: api.bool,
            Default: api.init(api.bool, false)
        }]
    ],
    function(scope, input) {
        let self = input("self").value;

        if (self.length < 2) {
            return new api.nil;
        }

        let rotations = input("rotations").value;
        let counterclockwise = input("counterclockwise").value;

        if (rotations < 0) {
            rotations = -rotations;
            counterclockwise = !counterclockwise;
        }

        if (counterclockwise) {
            while (rotations--) {
                self.push(self.shift());
            }
        } else {
            while (rotations--) {
                self.unshift(self.pop());
            }
        }

        return new api.nil;
    }
))];