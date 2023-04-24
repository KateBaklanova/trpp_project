class MealyError(Exception):
    pass


class G:

    def A(self, s):
        if (s == 'hoard'):
            self.currentState = self.B
            return 0
        else:
            self.currentState = self.F
            return 1

    def B(self, s):
        if (s == 'zoom'):
            self.currentState = self.C
            return 2
        else:
            return 3

    def C(self, s):
        if (s == 'zoom'):
            self.currentState = self.D
            return 4
        else:
            raise MealyError(s)

    def D(self, s):
        if (s == 'zoom'):
            self.currentState = self.E
            return 5
        else:
            raise MealyError(s)

    def E(self, s):
        if (s == 'hoard'):
            self.currentState = self.F
            return 6
        else:
            self.currentState = self.A
            return 7

    def F(self, s):
        if (s == 'zoom'):
            self.currentState = self.G
            return 8
        else:
            raise MealyError(s)

    def G(self, s):
        if (s == 'zoom'):
            self.currentState = self.D
            return 9
        else:
            raise MealyError(s)
    
    def __init__(self):
        self.currentState = self.A

    def hoard(self):
        return self.currentState("hoard")

    def zoom(self):
        return self.currentState("zoom")


def main():
    return G()


def raises(function, error):
    output = None
    try:
        output = function()
    except Exception as ex:
        assert type(ex) == error
    assert output is None


def test():
    o = main()
    assert o.hoard() == 0
    assert o.hoard() == 3
    assert o.zoom() == 2
    assert o.zoom() == 4
    assert o.zoom() == 5
    assert o.hoard() == 6
    assert o.zoom() == 8
    assert o.zoom() == 9
    assert o.zoom() == 5
    assert o.zoom() == 7
    assert o.zoom() == 1
    assert o.zoom() == 8
    assert o.zoom() == 9
    
    b = main()
    assert b.hoard() == 0
    assert b.hoard() == 3
    assert b.zoom() == 2
    assert b.zoom() == 4
    assert b.zoom() == 5
    assert b.hoard() == 6
    assert b.zoom() == 8
    assert b.zoom() == 9
    assert b.zoom() == 5
    assert b.zoom() == 7
    assert b.zoom() == 1
    assert b.zoom() == 8
    assert b.zoom() == 9
    
    c = main()
    assert c.zoom() == 1
    assert c.zoom() == 8
    assert c.zoom() == 9
    assert c.zoom() == 5
    assert c.zoom() == 7
    assert c.hoard() == 0
    
    a = main()
    assert a.hoard() == 0
    assert a.hoard() == 3
    assert a.zoom() == 2
    raises(lambda: a.hoard(), MealyError)
    assert a.zoom() == 4
    raises(lambda: a.hoard(), MealyError)
    assert a.zoom() == 5
    assert a.hoard() == 6
    raises(lambda: a.hoard(), MealyError)
    assert a.zoom() == 8
    raises(lambda: a.hoard(), MealyError)
    assert a.zoom() == 9
    raises(lambda: a.hoard(), MealyError)
    assert a.zoom() == 5
    assert a.zoom() == 7
    assert a.zoom() == 1
    raises(lambda: a.hoard(), MealyError)
    assert a.zoom() == 8
    raises(lambda: a.hoard(), MealyError)
    assert a.zoom() == 9
    raises(lambda: a.hoard(), MealyError)
test()