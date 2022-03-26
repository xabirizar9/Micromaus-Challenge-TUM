INPUTS=$(wildcard *.tex)

all: protokoll.pdf

protokoll.pdf: $(INPUTS)

%.pdf: %.tex
	latexmk -xelatex -shell-escape $<

clean-figures:
	rm -f tikz/*
	rm -f protokoll.pdf protokoll.aux

clean:
	rm -f tikz/* protokoll.bbl protokoll.auxlock protokoll.run.xml
	latexmk -c
	rm -f protokoll.pdf protokoll.xdv
